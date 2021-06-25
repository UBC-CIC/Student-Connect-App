import logging
import os
import boto3
import pytz
import requests
import json
from datetime import datetime
from common_lib import detailed_exception, get_adjusted_unix_time

# Log level
logging.basicConfig()
LOGGER = logging.getLogger()
if os.environ["DEBUG_MODE"] == "true":
    LOGGER.setLevel(logging.DEBUG)
else:
    LOGGER.setLevel(logging.INFO)

# Get AWS region and necessary clients
EVENTS_TABLE = os.environ["EVENTS_TABLE_NAME"]
EVENTS_EXPIRY_OFFSET = int(os.environ["EVENTS_EXPIRY_OFFSET"])
DYNAMODB_RESOURCE = boto3.resource("dynamodb")
SSM_CLIENT = boto3.client("ssm")


def event_parser(event_json):
    """
    Parses individual event items from the REST API Response by keeping specific information
    and transforming some

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
        "eventId": str(event_json.get("id", "Null")),
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


def parse_events(events_response):
    """
    Loops through the list of events in the REST API response and parses them

    :param events_response:
    :return: JSON formatted list of event items
    """
    events = []
    event_list = events_response["events"]
    for event in event_list:
        events.append(event_parser(event))
    return events


def get_all_events(url):
    """
    Returns a list of all parsed events from the events page REST API, by looping through all result pages

    :param url: The events page REST API url
    :return: JSON formatted list of parsed events
    """
    events = []
    json_response = requests.get(url).json()
    events.extend(parse_events(json_response))
    while json_response.get("next_rest_url") is not None:
        next_page = json_response["next_rest_url"]
        json_response = requests.get(next_page).json()
        events.extend(parse_events(json_response))
    return events


def lambda_handler(event, context):
    """
    Lambda entry-point
    """
    base_url = "https://events.ok.ubc.ca/wp-json/tribe/events/v1/events"
    events = []
    newly_updated_events = []

    try:
        last_query_time = SSM_CLIENT.get_parameter(Name="EventsQueryTime")["Parameter"]["Value"]
        events = get_all_events(base_url)

        # Filter the events to keep the new ones since the last query
        for event_item in events:
            if datetime.strptime(last_query_time, "%Y-%m-%d %H:%M:%S") \
                    < datetime.strptime(event_item["dateModified"], "%Y-%m-%d %H:%M:%S"):
                newly_updated_events.append(event_item)

        SSM_CLIENT.put_parameter(Name="EventsQueryTime",
                                 Value=str(datetime.now(tz=pytz.timezone("America/Vancouver")))[:-13],
                                 Overwrite=True)
    except Exception as error:
        detailed_exception(LOGGER)

    LOGGER.debug(json.dumps(events, indent=4))
    LOGGER.debug(json.dumps(newly_updated_events, indent=4))

    table = DYNAMODB_RESOURCE.Table(EVENTS_TABLE)
    # Create a TTL for each item and insert into DynamoDB
    for event_item in newly_updated_events:
        event_item["expiresOn"] = get_adjusted_unix_time(event_item["endDate"], "%Y-%m-%d %H:%M:%S",
                                                         EVENTS_EXPIRY_OFFSET * 24)
        table.put_item(Item=event_item)

    return {"status": "completed"}
