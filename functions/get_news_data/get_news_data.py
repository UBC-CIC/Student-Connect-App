import logging
import boto3
import os
import pytz
import requests
import json
import feedparser
from requests import RequestException
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
DOCUMENTS_TABLE = os.environ["NEWS_TABLE_NAME"]
EXPIRY_DAYS_OFFSET = int(os.environ["DOCUMENT_EXPIRY_DAYS"])
DYNAMODB_RESOURCE = boto3.resource("dynamodb")
SSM_CLIENT = boto3.client("ssm")
S3_CLIENT = boto3.client("s3")
S3_BUCKET_NAME = os.environ["BUCKET_NAME"]


def news_parser(news_json: dict):
    """
    Given a news JSON item from the unaltered API Response, it retains specific information and creates a JSON formatted
    dictionary containing data needed by the DynamoDB table. Variable names for the dictionary are in camelCase.

    :param news_json: Unaltered JSON item from UBCO news API Response
    :return: JSON formatted item for DynamoDB storage
    """
    parsed_news = {
        "documentId": str(news_json.get("id", "Null").partition("=")[2]),
        "documentType": "news",
        "title": news_json.get("title", "Null"),
        "link": news_json.get("id", "Null"),
        "summary": news_json.get("summary", "Null"),
        "mediaThumbnail": news_json.get("media_thumbnail", []),
        "categories": [category["term"] for category in news_json["tags"]],
        "dateModified": str(datetime.strptime(news_json["published"].split(",")[1][1:-6], "%d %b %Y %H:%M:%S"))
    }
    return parsed_news


def get_news_items_from_web(news_link: str):
    """
    Makes a network request to the news RSS Feed and returns the result of the request.
    Logs a network error if any an returns an empty list in that case
    :param news_link: URL for the new RSS Feed
    :return: List of news items
    """
    json_response = []
    try:
        feed_response = requests.get(news_link).text
        json_response = feedparser.parse(feed_response)["entries"]
    except RequestException as e:
        LOGGER.error("Network error in getting RSS Feed")
        detailed_exception(LOGGER)
    return json_response


def lambda_handler(event, context):
    """
    Lambda entry-point
    """
    news_link = "https://news.ok.ubc.ca/feed/"
    news_items = []
    filtered_news_items = []

    response_items = get_news_items_from_web(news_link)
    if len(response_items) == 0:
        return {"status": "No items in RSS Feed"}

    # Iterate through list of raw items and parse them, if there is a parsing error, save the raw item that throws an
    # error to S3
    for item in response_items:
        try:
            news_item = news_parser(item)
            news_items.append(news_item)
        except Exception as e:
            S3_CLIENT.put_object(Body=json.dumps(item, indent=4), Bucket=S3_BUCKET_NAME,
                                 Key=f'ErrorLog/News/{str(datetime.now(tz=pytz.timezone("America/Vancouver")))[:-13]}.json')
            LOGGER.error(f"Error in parsing a news item, raw item saved to {S3_BUCKET_NAME}/ErrorLog/News")
            detailed_exception(LOGGER)

    # Filter the parsed items based on last query time to get only new items
    try:
        last_query_time = SSM_CLIENT.get_parameter(Name="NewsQueryTime")["Parameter"]["Value"]
        for news_item in news_items:
            if datetime.strptime(last_query_time, "%Y-%m-%d %H:%M:%S") \
                    < datetime.strptime(news_item["dateModified"], "%Y-%m-%d %H:%M:%S"):
                filtered_news_items.append(news_item)
    except SSM_CLIENT.exceptions.InternalServerError as e:
        LOGGER.error("Error in communicating with Parameter store")
        detailed_exception(LOGGER)

    LOGGER.debug(json.dumps(news_items, indent=4))
    LOGGER.debug(json.dumps(filtered_news_items, indent=4))

    # Save new items to central data lake S3
    if len(filtered_news_items) != 0:
        S3_CLIENT.put_object(Body=json.dumps(filtered_news_items, indent=4), Bucket=S3_BUCKET_NAME,
                             Key=f'News/{str(datetime.now(tz=pytz.timezone("America/Vancouver")))[:-13]}.json')

    # Insert items into DynamoDB table with appropriate TTL
    table = DYNAMODB_RESOURCE.Table(DOCUMENTS_TABLE)
    for events_item in filtered_news_items:
        events_item["expiresOn"] = get_adjusted_unix_time(events_item["dateModified"], "%Y-%m-%d %H:%M:%S",
                                                          EXPIRY_DAYS_OFFSET * 24)
        if (events_item["documentId"] == ""):
            continue
        table.put_item(Item=events_item)

    # update the date in the SSM client only when everything succeeded
    try:
        SSM_CLIENT.put_parameter(Name="NewsQueryTime",
                                 Value=str(datetime.now(tz=pytz.timezone("America/Vancouver")))[:-13],
                                 Overwrite=True)
    except SSM_CLIENT.exceptions.InternalServerError as e:
        LOGGER.error("Error in communicating with Parameter store")
        detailed_exception(LOGGER)

    return {"status": "completed"}

