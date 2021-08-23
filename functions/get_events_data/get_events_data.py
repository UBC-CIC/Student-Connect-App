import logging
import os
import boto3
import pytz
import requests
import json
from datetime import datetime, timezone
from requests import RequestException
from common_lib import detailed_exception, get_adjusted_unix_time

# Log level
logging.basicConfig()
LOGGER = logging.getLogger()
if os.environ["DEBUG_MODE"] == "true":
    LOGGER.setLevel(logging.DEBUG)
else:
    LOGGER.setLevel(logging.INFO)

# Get AWS region and necessary clients
DOCUMENTS_TABLE = os.environ["DOCUMENTS_TABLE_NAME"]
EVENTS_EXPIRY_OFFSET = int(os.environ["EVENTS_EXPIRY_OFFSET"])
DYNAMODB_RESOURCE = boto3.resource("dynamodb")
SSM_CLIENT = boto3.client("ssm")
S3_CLIENT = boto3.client("s3")
S3_BUCKET_NAME = os.environ["BUCKET_NAME"]


def event_parser(event_json: dict):
    """
    Parses individual event items from the REST API Response by keeping specific information
    and transforming some. Replaces values with "Null" if a certain item field is not present in the raw
    item data

    :param event_json: Individual JSON item to format
    :return: Parsed JSON formatted Event item dictionary
    """
    venue = event_json.get("venue")
    if venue.get("address") == "Online":
        event_location = {"venue": "Online"}
    else:
        event_location = {
            "venue": venue.get("venue", "Null"),
            "address": venue.get("address", "Null"),
            "city": venue.get("city", "Null"),
            "country": venue.get("country", "Null"),
            "province": venue.get("province", "Null"),
            "zip": venue.get("zip", "Null"),
        }
    parsed_event = {
        "documentId": str(event_json.get("id", "Null")),
        "documentType": "events",
        "status": event_json.get("status", "Null"),
        "dateModified": event_json.get("modified", "Null"),
        "link": event_json.get("url", "Null"),
        "title": event_json.get("title", "Null"),
        "description": event_json.get("description", "Null"),
        "excerpt": event_json.get("excerpt", "Null"),
        "allDay": event_json.get("all_day", "Null"),
        "startDate": event_json.get("start_date", "Null"),
        "endDate": event_json.get("end_date", "Null"),
        "cost": event_json.get("cost", "Null"),
        "categories": [category["name"] for category in event_json.get("categories", "Null")],
        "eventLocation": event_location,
    }

    # Check if event has an image included or not
    if event_json.get("image") is False:
        parsed_event["fullImage"] = False
        parsed_event["thumbnailImage"] = False
    else:
        parsed_event["fullImage"] = event_json.get("image", "Null").get("url", "Null"),
        parsed_event["thumbnailImage"] = event_json.get("image", "Null") \
            .get("sizes", "Null") \
            .get("thumbnail", "Null") \
            .get("url", "Null")

    return parsed_event


def get_events_items_from_web(events_link: str):
    """
    Performs a GET request on the events_link provided, loops through all the pages of the paginated result
    and returns a list of the raw event items.
    Logs a network error if any an returns an empty list in that case
    :param events_link: URL of the API to perform a get request on
    :return: List of raw event items
    """
    events = []
    try:
        json_response = requests.get(events_link).json()
        events.extend(json_response["events"])
        while json_response.get("next_rest_url") is not None:
            next_page = json_response["next_rest_url"]
            json_response = requests.get(next_page).json()
            events.extend(json_response["events"])

    except RequestException as e:
        LOGGER.error("Network error in getting API Response")
        detailed_exception(LOGGER)

    return events


def lambda_handler(event, context):
    """
    TODO Refactor implementation to, 1) Do wordpress query by date if possible
    Lambda entry-point
    """

    events_link = "https://events.ok.ubc.ca/wp-json/tribe/events/v1/events"
    events_items = []
    filtered_events_items = []

    response_items = get_events_items_from_web(events_link)
    if len(response_items) == 0:
        return {"status": "No items in API"}

    # Iterate through list of raw items and parse them, if there is a parsing error, save the raw item that throws an
    # error to S3
    for item in response_items:
        try:
            events_item = event_parser(item)
            events_items.append(events_item)
        except Exception as e:
            S3_CLIENT.put_object(Body=json.dumps(item, indent=4), Bucket=S3_BUCKET_NAME,
                                 Key=f'ErrorLog/Events/{str(datetime.now(tz=pytz.timezone("America/Vancouver")))[:-13]}.json')
            LOGGER.error(f"Error in parsing an events item, raw item saved to {S3_BUCKET_NAME}/ErrorLog/Events")
            detailed_exception(LOGGER)

    # Filter the parsed items based on last query time to get only new items
    try:
        last_query_time = SSM_CLIENT.get_parameter(Name="EventsQueryTime")["Parameter"]["Value"]
        for events_item in events_items:
            if datetime.strptime(last_query_time, "%Y-%m-%d %H:%M:%S") \
                    < datetime.strptime(events_item["dateModified"], "%Y-%m-%d %H:%M:%S"):
                filtered_events_items.append(events_item)
        SSM_CLIENT.put_parameter(Name="EventsQueryTime",
                                 Value=str(datetime.now(tz=pytz.timezone("America/Vancouver")))[:-13],
                                 Overwrite=True)
    except SSM_CLIENT.exceptions.InternalServerError as e:
        LOGGER.error("Error in communicating with Parameter store")
        detailed_exception(LOGGER)

    LOGGER.debug(json.dumps(events_items, indent=4))
    LOGGER.debug(json.dumps(filtered_events_items, indent=4))

    # Save new items to central data lake S3
    if len(filtered_events_items) != 0:
        S3_CLIENT.put_object(Body=json.dumps(filtered_events_items), Bucket=S3_BUCKET_NAME,
                             Key=f'Events/{str(datetime.now(tz=pytz.timezone("America/Vancouver")))[:-13]}.json')

    # Insert items into DynamoDB table with appropriate TTL
    table = DYNAMODB_RESOURCE.Table(DOCUMENTS_TABLE)
    for events_item in filtered_events_items:
        events_item["expiresOn"] = get_adjusted_unix_time(events_item["endDate"], "%Y-%m-%d %H:%M:%S",
                                                          EVENTS_EXPIRY_OFFSET * 24)
        table.put_item(Item=events_item)

    return {"status": "completed"}
