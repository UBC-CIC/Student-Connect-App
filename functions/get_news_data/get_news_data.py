import logging
from datetime import datetime
import boto3
import os
import pytz
import requests
import json
import feedparser
from common_lib import detailed_exception, get_adjusted_unix_time

# Log level
logging.basicConfig()
LOGGER = logging.getLogger()
if os.environ["DEBUG_MODE"] == "true":
    LOGGER.setLevel(logging.DEBUG)
else:
    LOGGER.setLevel(logging.INFO)

# Get AWS region and necessary clients
# REGION = boto3.session.Session().region_name
NEWS_TABLE = os.environ["NEWS_TABLE_NAME"]
EXPIRY_DAYS_OFFSET = int(os.environ["DOCUMENT_EXPIRY_DAYS"])
DYNAMODB_RESOURCE = boto3.resource("dynamodb")
SSM_CLIENT = boto3.client("ssm")


def news_parser(news_json):
    """
    Given a news JSON item from the unaltered API Response, it retains specific information and creates a JSON formatted
    dictionary containing data needed by the DynamoDB table. Variable names for the dictionary are in camelCase.

    :param news_json: Unaltered JSON item from UBCO news API Response
    :return: JSON formatted item for DynamoDB storage
    """
    parsed_news = {
        "newsId": str(news_json.get("post-id", "Null")),
        "title": news_json.get("title", "Null"),
        "link": news_json.get("id", "Null"),
        "summary": news_json.get("summary", "Null"),
        "mediaThumbnail": news_json.get("media_thumbnail", []),
        "categories": [category["term"] for category in news_json["tags"]],
        "dateModified": str(datetime.strptime(news_json["published"].split(",")[1][1:-6], "%d %b %Y %H:%M:%S"))
    }
    return parsed_news


def get_all_news(url):
    """
    Calls the news RSS API, parses the resulting response and returns a list of parsed news_items to be stored in
    DynamoDB

    :param url: Url for the RSS API for UBCO news
    :return: Parsed news items in a JSON formatted list
    """
    news = []
    json_response = feedparser.parse(requests.get(url).text)
    for news_item in json_response["entries"]:
        news.append(news_parser(news_item))
    return news


def lambda_handler(event, context):
    """
    Lambda entry-point
    """
    base_url = "https://news.ok.ubc.ca/feed/"
    news = []
    newly_updated_news = []

    try:
        last_query_time = SSM_CLIENT.get_parameter(Name="NewsQueryTime")["Parameter"]["Value"]
        news = get_all_news(base_url)

        # Filter the news to keep the ones since the last query
        for news_item in news:
            if datetime.strptime(last_query_time, "%Y-%m-%d %H:%M:%S") \
                    < datetime.strptime(news_item["dateModified"], "%Y-%m-%d %H:%M:%S"):
                newly_updated_news.append(news_item)

        SSM_CLIENT.put_parameter(Name="NewsQueryTime",
                                 Value=str(datetime.now(tz=pytz.timezone("America/Vancouver")))[:-13],
                                 Overwrite=True)
    except Exception as error:
        detailed_exception(LOGGER)

    LOGGER.debug(json.dumps(news, indent=4))
    LOGGER.debug(json.dumps(newly_updated_news, indent=4))

    table = DYNAMODB_RESOURCE.Table(NEWS_TABLE)
    # Create one month TTL for each item and insert into DynamoDB
    for news_item in newly_updated_news:
        news_item["expiresOn"] = get_adjusted_unix_time(news_item["dateModified"], "%Y-%m-%d %H:%M:%S",
                                                        EXPIRY_DAYS_OFFSET * 24)
        table.put_item(Item=news_item)

    return {"status": "completed"}
