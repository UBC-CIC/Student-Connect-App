import logging
import requests
import json
import feedparser

# Log level
logging.basicConfig()
LOGGER = logging.getLogger()
LOGGER.setLevel(logging.INFO)

# Get AWS region and necessary clients
# REGION = boto3.session.Session().region_name


def news_parser(news_json):
    parsed_news = {
        "news_id": news_json["post-id"],
        "title": news_json["title"],
        "link": news_json["id"],
        "categories": [category["term"] for category in news_json["tags"]],
        "summary": news_json["summary"],
        "publish_date": news_json["published"],
        "media_thumbnail": news_json["media_thumbnail"]
    }
    return parsed_news


def get_all_news(url):
    news = []
    json_response = feedparser.parse(requests.get(url).text)
    for news_item in json_response["entries"]:
        news.append(news_parser(news_item))
    return news


def lambda_handler(event, context):
    """
    """
    base_url = "https://news.ok.ubc.ca/feed/"
    news = get_all_news(base_url)
    # TODO Implement saving last query date and automating data saving to DynamoDB
    # TODO Consider TTL for data
    LOGGER.debug(json.dumps(news, indent=4))
    return {'status': "completed"}

