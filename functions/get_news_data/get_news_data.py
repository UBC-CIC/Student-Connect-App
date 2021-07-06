import logging
from datetime import datetime
import boto3
import os
import pytz
import requests
import json
import feedparser
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
NEWS_TABLE = os.environ["NEWS_TABLE_NAME"]
EXPIRY_DAYS_OFFSET = int(os.environ["DOCUMENT_EXPIRY_DAYS"])
DYNAMODB_RESOURCE = boto3.resource("dynamodb")
SSM_CLIENT = boto3.client("ssm")
S3_CLIENT = boto3.client("s3")
S3_BUCKET_NAME = os.environ["BUCKET_NAME"]


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


def get_news_items_from_web(news_link):
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

    for item in response_items:
        try:
            news_item = news_parser(item)
            news_items.append(news_item)
        except Exception as e:
            S3_CLIENT.put_object(Body=json.dumps(item, indent=4), Bucket=S3_BUCKET_NAME,
                                 Key=f'ErrorLog/News/{str(datetime.now(tz=pytz.timezone("America/Vancouver")))[:-13]}.json')
            LOGGER.error(f"Error in parsing a news item, raw item saved to {S3_BUCKET_NAME}/ErrorLog/News")
            detailed_exception(LOGGER)

    try:
        last_query_time = SSM_CLIENT.get_parameter(Name="NewsQueryTime")["Parameter"]["Value"]

        for news_item in news_items:
            if datetime.strptime(last_query_time, "%Y-%m-%d %H:%M:%S") \
                    < datetime.strptime(news_item["dateModified"], "%Y-%m-%d %H:%M:%S"):
                filtered_news_items.append(news_item)

        SSM_CLIENT.put_parameter(Name="NewsQueryTime",
                                 Value=str(datetime.now(tz=pytz.timezone("America/Vancouver")))[:-13],
                                 Overwrite=True)

    except SSM_CLIENT.exceptions.InternalServerError as e:
        LOGGER.error("Error in communicating with Parameter store")
        detailed_exception(LOGGER)

    LOGGER.debug(json.dumps(news_items, indent=4))
    LOGGER.debug(json.dumps(filtered_news_items, indent=4))

    S3_CLIENT.put_object(Body=json.dumps(filtered_news_items, indent=4), Bucket=S3_BUCKET_NAME,
                         Key=f'News/{str(datetime.now(tz=pytz.timezone("America/Vancouver")))[:-13]}.json')

    table = DYNAMODB_RESOURCE.Table(NEWS_TABLE)
    # Create a TTL for each item and insert into DynamoDB
    for events_item in filtered_news_items:
        events_item["expiresOn"] = get_adjusted_unix_time(events_item["endDate"], "%Y-%m-%d %H:%M:%S",
                                                          EXPIRY_DAYS_OFFSET * 24)
        table.put_item(Item=events_item)

    return {"status": "completed"}

    # try:
    #     last_query_time = SSM_CLIENT.get_parameter(Name="NewsQueryTime")["Parameter"]["Value"]
    #     news = get_all_news(base_url)
    #
    #     # Filter the news to keep the ones since the last query
    #     for news_item in news:
    #         if datetime.strptime(last_query_time, "%Y-%m-%d %H:%M:%S") \
    #                 < datetime.strptime(news_item["dateModified"], "%Y-%m-%d %H:%M:%S"):
    #             newly_updated_news.append(news_item)
    #
    #     SSM_CLIENT.put_parameter(Name="NewsQueryTime",
    #                              Value=str(datetime.now(tz=pytz.timezone("America/Vancouver")))[:-13],
    #                              Overwrite=True)
    # except Exception as error:
    #     detailed_exception(LOGGER)
    #
    # LOGGER.debug(json.dumps(news, indent=4))
    # LOGGER.debug(json.dumps(newly_updated_news, indent=4))
    #
    # table = DYNAMODB_RESOURCE.Table(NEWS_TABLE)
    # # Create a TTL for each item and insert into DynamoDB
    # for news_item in newly_updated_news:
    #     news_item["expiresOn"] = get_adjusted_unix_time(news_item["dateModified"], "%Y-%m-%d %H:%M:%S",
    #                                                     EXPIRY_DAYS_OFFSET * 24)
    #     table.put_item(Item=news_item)
    #
    # return {"status": "completed"}
