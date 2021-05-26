import logging
import requests
import json

# Log level
logging.basicConfig()
LOGGER = logging.getLogger()
LOGGER.setLevel(logging.INFO)

# Get AWS region and necessary clients
# REGION = boto3.session.Session().region_name

category_map = {
    "34": "Advising",
    "33": "Careers",
    "67": "Grad",
    "27": "Health &amp; Wellness",
    "32": "New to UBC",
    "28": "UBCO Life",
    "1": "Uncategorized"
}

# TODO Implement storing last query date

def get_blog_thumbnail(media_url):
    media_response = requests.get(media_url).json()
    image_links = {
        "full_image": media_response["guid"]["rendered"],
        "medium_image": media_response["media_details"]["sizes"]["medium"]["source_url"]
    }
    return image_links


def blog_parser(blog_json):
    try:
        image_links = get_blog_thumbnail(blog_json["_links"]["wp:featuredmedia"][0]["href"])
    except KeyError as e:
        print(e)
        image_links = "None"
    parsed_blog = {
        "id": blog_json["id"],
        "title": blog_json["title"]["rendered"],
        "date": blog_json["date"],
        "link": blog_json["guid"]["rendered"],
        "categories": [category_map[str(category)] for category in blog_json["categories"]],
        "excerpt": blog_json["excerpt"]["rendered"],
        "media_images": image_links
    }
    return parsed_blog


def get_all_blogs(url):
    blogs = []
    json_response = requests.get(url).json()
    for blog_item in json_response:
        blogs.append(blog_parser(blog_item))
    return blogs


def lambda_handler(event, context):
    """
    """

    blogs_url = "https://students.ok.ubc.ca/wp-json/wp/v2/posts?order=asc"
    # TODO Implement automation with last query date and saving data to DynamoDB
    # TODO Consider TTL for data
    response = requests.get(blogs_url)
    LOGGER.debug(json.dumps(response.json(), indent=4))
    return {'status': "completed"}
