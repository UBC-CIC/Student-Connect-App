import logging
import os
import boto3
import pytz
import requests
import json
from requests import RequestException
from common_lib import detailed_exception, get_adjusted_unix_time
from datetime import datetime

# Log level
logging.basicConfig()
LOGGER = logging.getLogger()
if os.environ["DEBUG_MODE"] == "true":
    LOGGER.setLevel(logging.DEBUG)
else:
    LOGGER.setLevel(logging.INFO)

# Get AWS region and necessary clients
DOCUMENTS_TABLE = os.environ["DOCUMENTS_TABLE_NAME"]
EXPIRY_DAYS_OFFSET = int(os.environ["DOCUMENT_EXPIRY_DAYS"])
DYNAMODB_RESOURCE = boto3.resource("dynamodb")
SSM_CLIENT = boto3.client("ssm")
S3_CLIENT = boto3.client("s3")
S3_BUCKET_NAME = os.environ["BUCKET_NAME"]

# Dictionary that maps the category id numbers to their label text for cleaner parsing
CATEGORY_MAP = {
    "34": "Advising",
    "33": "Careers",
    "67": "Grad",
    "27": "Health and Wellness",
    "32": "New to UBC",
    "28": "UBCO Life",
    "1": "Uncategorized"
}


def get_blog_thumbnail(media_url: str):
    """
    Performs a second REST API call to fetch the cover image urls for a blog post

    :param media_url: Media REST API url for blog images
    :return: Dictionary containing image links to two blog cover image sizes, 'fullImage' and 'mediumImage'
    """
    try:
        media_response = requests.get(media_url).json()
        image_links = {
            "fullImage": media_response.get("guid", "Null").get("rendered", "Null"),
            "mediumImage": media_response.get("media_details", "Null")
                                         .get("sizes", "Null")
                                         .get("medium", "Null")
                                         .get("source_url", "Null")
        }
    except RequestException as e:
        detailed_exception(LOGGER)
        image_links = {"fullImage": "Null", "mediumImage": "Null"}
    return image_links


def blog_parser(blog_json: dict):
    """
    Parses blog items from the unaltered API response

    :param blog_json: Unaltered dict item from UBCO Student Life Blog API Response
    :return: JSON formatted dictionary item for DynamoDB storage
    """
    try:
        image_links = get_blog_thumbnail(blog_json["_links"]["wp:featuredmedia"][0]["href"])
    except KeyError as e:
        LOGGER.debug(f"No image in blog_item {blog_json['id']}")
        image_links = []
    parsed_blog = {
        "blogId": str(blog_json["id"]),
        "title": blog_json["title"]["rendered"],
        "link": blog_json["guid"]["rendered"],
        "excerpt": blog_json["excerpt"]["rendered"],
        "categories": [CATEGORY_MAP[str(category)] for category in blog_json["categories"]],
        "dateModified": str(datetime.strptime(blog_json["date"], "%Y-%m-%dT%H:%M:%S")),
        "mediaImages": image_links
    }
    return parsed_blog


def get_blog_items_from_web(blogs_link: str):
    """
    Performs a GET request on the student life blog REST API and returns a list of raw blog items
    Logs a network error if any an returns an empty list in that case
    :param blogs_link: REST API url for student life blog
    :return: List of raw blog items
    """
    blogs = []
    try:
        blogs = requests.get(blogs_link).json()
    except RequestException as e:
        LOGGER.error("Error in network request to API")
        detailed_exception(LOGGER)
    return blogs


def lambda_handler(event, context):
    """
    TODO Refactor implementation to, 1) Do wordpress query by date if possible
    Lambda entry-point
    """

    blogs_link = "https://students.ok.ubc.ca/wp-json/wp/v2/posts?_fields=id,title,guid,excerpt,categories,date,_links"

    blogs_items = []
    filtered_blogs_items = []

    response_items = get_blog_items_from_web(blogs_link)
    if len(response_items) == 0:
        return {"status": "No items in API"}

    # Iterate through list of raw items and parse them, if there is a parsing error, save the raw item that throws an
    # error to S3
    for item in response_items:
        try:
            blogs_item = blog_parser(item)
            blogs_items.append(blogs_item)
        except Exception as e:
            S3_CLIENT.put_object(Body=json.dumps(item, indent=4), Bucket=S3_BUCKET_NAME,
                                 Key=f'ErrorLog/Blogs/{str(datetime.now(tz=pytz.timezone("America/Vancouver")))}.json')
            LOGGER.error(f"Error in parsing a blog item, raw item saved to {S3_BUCKET_NAME}/ErrorLog/Blogs")
            detailed_exception(LOGGER)

    # Filter the parsed items based on last query time to get only new items
    try:
        last_query_time = SSM_CLIENT.get_parameter(Name="BlogsQueryTime")["Parameter"]["Value"]
        for blogs_item in blogs_items:
            if datetime.strptime(last_query_time, "%Y-%m-%d %H:%M:%S") \
                    < datetime.strptime(blogs_item["dateModified"], "%Y-%m-%d %H:%M:%S"):
                filtered_blogs_items.append(blogs_item)
        SSM_CLIENT.put_parameter(Name="BlogsQueryTime",
                                 Value=str(datetime.now(tz=pytz.timezone("America/Vancouver")))[:-13],
                                 Overwrite=True)
    except SSM_CLIENT.exceptions.InternalServerError as e:
        LOGGER.error("Error in communicating with Parameter store")
        detailed_exception(LOGGER)

    LOGGER.debug(json.dumps(blogs_items, indent=4))
    LOGGER.debug(json.dumps(filtered_blogs_items, indent=4))

    # Save new items to central data lake S3
    if len(filtered_blogs_items) != 0:
        S3_CLIENT.put_object(Body=json.dumps(filtered_blogs_items, indent=4), Bucket=S3_BUCKET_NAME,
                             Key=f'Blogs/{str(datetime.now(tz=pytz.timezone("America/Vancouver")))}.json')

    # Insert items into DynamoDB table with appropriate TTL
    table = DYNAMODB_RESOURCE.Table(DOCUMENTS_TABLE)
    for blogs_item in filtered_blogs_items:
        blogs_item["expiresOn"] = get_adjusted_unix_time(blogs_item["dateModified"], "%Y-%m-%d %H:%M:%S",
                                                         EXPIRY_DAYS_OFFSET * 24)
        table.put_item(Item=blogs_item)

    return {"status": "completed"}

