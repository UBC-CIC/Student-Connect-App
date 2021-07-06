import hashlib
import logging
from datetime import datetime, timedelta
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
ATHLETICS_NEWS_TABLE = os.environ["ATHLETICS_NEWS_TABLE_NAME"]
EXPIRY_DAYS_OFFSET = int(os.environ["DOCUMENT_EXPIRY_DAYS"])
DYNAMODB_RESOURCE = boto3.resource("dynamodb")
SSM_CLIENT = boto3.client("ssm")
S3_CLIENT = boto3.client("s3")
S3_BUCKET_NAME = os.environ["BUCKET_NAME"]

athletics_code_map = {
    "bsb": ["Male", "Baseball", "Sports"],
    "mbkb": ["Male", "Basketball", "Sports"],
    "mcrew": ["Male", "Crew", "Sports"],
    "mxc": ["Male", "Cross Country", "Sports"],
    "fball": ["Male", "Football", "Sports"],
    "mgolf": ["Male", "Golf", "Sports"],
    "mice": ["Male", "Ice Hockey", "Sports"],
    "mlax": ["Male", "Lacrosse", "Sports"],
    "skiing": ["Skiing", "Sports"],
    "msoc": ["Male", "Soccer", "Sports"],
    "msquash": ["Male", "Squash", "Sports"],
    "mswimdive": ["Male", "Swimming and Diving", "Sports"],
    "mten": ["Male", "Tennis", "Sports"],
    "mtrack": ["Male", "Track and Field", "Sports"],
    "mvball": ["Male", "Volleyball", "Sports"],
    "wrest": ["Male", "Wrestling", "Sports"],
    "wbkb": ["Female", "Basketball", "Sports"],
    "wxc": ["Female", "Cross Country", "Sports"],
    "wcrew": ["Female", "Crew", "Sports"],
    "fh": ["Female", "Field Hockey", "Sports"],
    "wgolf": ["Female", "Golf", "Sports"],
    "wice": ["Female", "Ice Hockey", "Sports"],
    "wlax": ["Female", "Lacrosse", "Sports"],
    "wsoc": ["Female", "Soccer", "Sports"],
    "sball": ["Female", "Softball", "Sports"],
    "wsquash": ["Female", "Squash", "Sports"],
    "wswimdive": ["Female", "Swimming and Diving", "Sports"],
    "wten": ["Female", "Tennis", "Sports"],
    "wtrack": ["Female", "Track and Field", "Sports"],
    "wvball": ["Female", "Volleyball", "Sports"]
}


def news_parser(news_json):
    """
    Given a news JSON item from the unaltered RSS Feed Response, it retains specific information and creates a JSON formatted
    dictionary containing data needed by the DynamoDB table. Variable names for the dictionary are in camelCase.

    :param news_json: Unaltered JSON item from UBCO Athletics news RSS Feed response
    :return: JSON formatted item for DynamoDB storage
    """
    item_datetime = news_json.get("published", "Null")
    if item_datetime == "Null":
        item_datetime = str(datetime.now(tz=pytz.timezone("America/Vancouver")))[:-13]
    else:
        temp_datetime = datetime.strptime(item_datetime, "%a, %d %b %Y %H:%M:%S %Z"). \
            astimezone(tz=pytz.timezone("America/Vancouver"))
        item_datetime = get_datetime_without_offset(str(temp_datetime))
    categories = get_sports_categories(news_json["id"])
    parsed_news = {
        "newsId": hashlib.md5(str(news_json.get("id", "Null")).encode("utf-8")).hexdigest(),
        "title": news_json.get("title", "Null"),
        "link": news_json.get("id", "Null"),
        "summary": news_json.get("summary", "Null"),
        "mediaThumbnail": news_json.get("links", {})[1].get("href", "Null")
            .replace("max_width=160&max_height=120", "max_width=640&max_height=480"),
        "categories": categories,
        "dateModified": item_datetime
    }
    return parsed_news


def get_sports_categories(url):
    """
    Uses the URL of the athletics news item to determine its categories and returns that as a string list
    """
    category_list = []
    for key in athletics_code_map.keys():
        if key in url:
            category_list.extend(athletics_code_map.get(key))
            return category_list

    category_list.append("Sports")
    return category_list


def get_datetime_without_offset(ts):
    """
    Convert timestamp strings in UTC format with offset to
    a timestamp string with the offset added/subtracted
    E.g 2021-05-20 21:00:00-07:00 to 2021-05-20 13:00:00
    https://stackoverflow.com/questions/54545773/python-date-with-offset-conversion-to-non-offset
    """
    timestamp, plus, offset = ts[:19], ts[19], ts[20:]
    # should validate plus is '+' or '-'
    datetime_format = '%Y-%m-%d %H:%M:%S'
    base = datetime.strptime(timestamp, datetime_format)
    hours, minutes = [int(n) for n in offset.split(':')]
    delta = timedelta(hours=hours, minutes=minutes)
    multiplier = -1 if plus == '-' else 1
    return (base + multiplier * delta).strftime(datetime_format)


def get_news_items_from_web(url):
    """
    Calls the Athletics News RSS API, parses the resulting response and returns a list of parsed news_items to be
    stored in DynamoDB

    :param url: Url for the RSS API for UBCO Heat
    :return: Parsed news items in a JSON formatted list
    """
    try:
        request_response = requests.get(url).text
        return feedparser.parse(request_response)["entries"]
    except RequestException as e:
        LOGGER.error("Error in network request to RSS Feed")
        detailed_exception(LOGGER)
        return []


def lambda_handler(event, context):
    """
    Lambda entry-point
    """
    athletics_link = "https://goheat.prestosports.com/landing/headlines-featured?feed=rss_2.0"
    news_items = []
    filtered_news_items = []
    response_items = get_news_items_from_web(athletics_link)

    if len(response_items) == 0:
        return {"status": "No items in feed"}

    for item in response_items:
        try:
            news_item = news_parser(item)
            news_items.append(news_item)
        except Exception as e:
            S3_CLIENT.put_object(Body=json.dumps(item, indent=4), Bucket=S3_BUCKET_NAME,
                                 Key=f'ErrorLog/AthleticsNews/{str(datetime.now(tz=pytz.timezone("America/Vancouver")))[:-13]}.json')
            LOGGER.error(f"Error in parsing a news item, raw item saved to {S3_BUCKET_NAME}/ErrorLog/AthleticsNews")
            detailed_exception(LOGGER)

    try:
        last_query_time = SSM_CLIENT.get_parameter(Name="AthleticsNewsQueryTime")["Parameter"]["Value"]

        for news_item in news_items:
            if datetime.strptime(last_query_time, "%Y-%m-%d %H:%M:%S") \
                    < datetime.strptime(news_item["dateModified"], "%Y-%m-%d %H:%M:%S"):
                filtered_news_items.append(news_item)

        SSM_CLIENT.put_parameter(Name="AthleticsNewsQueryTime",
                                 Value=str(datetime.now(tz=pytz.timezone("America/Vancouver")))[:-13],
                                 Overwrite=True)

    except SSM_CLIENT.exceptions.InternalServerError as e:
        LOGGER.error("Error in communicating with Parameter store")
        detailed_exception(LOGGER)

    LOGGER.debug(json.dumps(news_items, indent=4))
    LOGGER.debug(json.dumps(filtered_news_items, indent=4))

    S3_CLIENT.put_object(Body=json.dumps(filtered_news_items, indent=4), Bucket=S3_BUCKET_NAME,
                         Key=f'AthleticsNews/{str(datetime.now(tz=pytz.timezone("America/Vancouver")))[:-13]}.json')

    table = DYNAMODB_RESOURCE.Table(ATHLETICS_NEWS_TABLE)
    # Create a TTL for each item and insert into DynamoDB
    for news_item in filtered_news_items:
        news_item["expiresOn"] = get_adjusted_unix_time(news_item["dateModified"], "%Y-%m-%d %H:%M:%S",
                                                        EXPIRY_DAYS_OFFSET * 24)
        table.put_item(Item=news_item)

    return {"status": "completed"}
