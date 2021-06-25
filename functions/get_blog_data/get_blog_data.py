import logging
import os
import boto3
import pytz
import requests
import json
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
BLOGS_TABLE = os.environ["BLOGS_TABLE_NAME"]
EXPIRY_DAYS_OFFSET = int(os.environ["DOCUMENT_EXPIRY_DAYS"])
DYNAMODB_RESOURCE = boto3.resource("dynamodb")
SSM_CLIENT = boto3.client("ssm")

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


def get_blog_thumbnail(media_url):
    """
    Performs a second REST API call to fetch the cover image urls for a blog post

    :param media_url: Media REST API url for blog images
    :return: Dictionary containing image links to two blog cover image sizes, 'fullImage' and 'mediumImage'
    """
    media_response = requests.get(media_url).json()
    image_links = {
        "fullImage": media_response.get("guid", "Null").get("rendered", "Null"),
        "mediumImage": media_response.get("media_details", "Null")
                                     .get("sizes", "Null")
                                     .get("medium", "Null")
                                     .get("source_url", "Null")
    }
    return image_links


def blog_parser(blog_json):
    """
    Parses blog items from the unaltered API response

    :param blog_json: Unaltered JSON item from UBCO news API Response
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


def get_all_blogs(url):
    """
    Calls the blogs REST API, parses the resulting response and returns a list of parsed blog_items to be stored in
    DynamoDB

    :param url: Url for the REST API for UBCO Student Life Blogs
    :return: Parsed blog items in a JSON formatted list
    """
    blogs = []
    json_response = requests.get(url).json()
    for blog_item in json_response:
        blogs.append(blog_parser(blog_item))
    return blogs


def lambda_handler(event, context):
    """
    """

    blogs_url = "https://students.ok.ubc.ca/wp-json/wp/v2/posts?order=desc"
    blogs = []
    newly_updated_blogs = []

    try:
        last_query_time = SSM_CLIENT.get_parameter(Name="BlogsQueryTime")["Parameter"]["Value"]
        blogs = get_all_blogs(blogs_url)

        # Filter the news to keep the ones since the last query
        for blog_item in blogs:
            if datetime.strptime(last_query_time, "%Y-%m-%d %H:%M:%S") \
                    < datetime.strptime(blog_item["dateModified"], "%Y-%m-%d %H:%M:%S"):
                newly_updated_blogs.append(blog_item)

        SSM_CLIENT.put_parameter(Name="BlogsQueryTime",
                                 Value=f"{str(datetime.now(tz=pytz.timezone('America/Vancouver')))[:-13]}",
                                 Overwrite=True)

    except Exception as error:
        detailed_exception(LOGGER)

    LOGGER.debug(f"Original Blogs: {json.dumps(blogs, indent=4)}")
    LOGGER.info(f"Time filtered Blogs: {json.dumps(newly_updated_blogs, indent=4)}")

    table = DYNAMODB_RESOURCE.Table(BLOGS_TABLE)
    # Create a TTL for each item and insert into DynamoDB
    for blog_item in newly_updated_blogs:
        blog_item["expiresOn"] = get_adjusted_unix_time(blog_item["dateModified"], "%Y-%m-%d %H:%M:%S",
                                                        EXPIRY_DAYS_OFFSET * 24)
        response = table.put_item(Item=blog_item)
        LOGGER.info(response)

    return {'status': "completed"}
