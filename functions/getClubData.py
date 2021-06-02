import boto3
import os
import requests
import json
import sys
import logging
from bs4 import BeautifulSoup
from common_lib import detailed_exception


sys.setrecursionlimit(3000)

# Log level
logging.basicConfig()
LOGGER = logging.getLogger()
LOGGER.setLevel(logging.INFO)


CLUBS_TABLE = os.environ["CLUBS_TABLE_NAME"]
DYNAMODB_RESOURCE = boto3.resource("dynamodb")

STUDENT_UNION_BASE_URL = "https://www.ubcsuo.ca"
STUDENT_UNION_CLUBS_URL = "https://www.ubcsuo.ca/club-directory"
CLUB_LISTING = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k",
                "l", "m", "n", "p", "r", "s", "t", "u", "v", "w", "y"]


def parse_club_html_nodes(club_html_nodes):
    clubs = []
    for node in club_html_nodes:
        club_item = {}
        club_item['title'] = node.find("h4").text

        image_link = node.find("img").attrs["src"]
        if image_link == "/sites/all/themes/ubcsuo/gfx/img_club.jpg":
            image_link = f"{STUDENT_UNION_BASE_URL}{image_link}"
        club_item["imageLink"] = image_link

        paragraphs = node.find_all("p")
        if len(paragraphs) == 0:
            club_item["description"] = "None"
        else:
            club_item["description"] = paragraphs[0].text

        links_node = node.find("ul", {"class": "clearfix"})
        link_list = links_node.find_all("li")
        for link in link_list:
            link_name = link["class"][0][3:]
            if link_name == "email":
                club_item["email"] = link.a.contents[1]
            elif link_name == "facebook":
                if "https://www.facebook.com/" in str(link.a.attrs["href"]):   # Check to ignore broken Facebook links
                    club_item["facebook"] = link.a.attrs["href"]
            else:
                club_item[f"{link_name}"] = link.a.attrs["href"]

        clubs.append(club_item)
    return clubs


def get_all_clubs(url):
    club_result = []
    club_html_nodes = []
    for letter in CLUB_LISTING:
        directory_url = f"{url}/{letter}"
        html_result = requests.get(directory_url).text
        html_soup = BeautifulSoup(html_result, "html.parser")
        links_block = html_soup.find("div", {"class": "view-content"})
        club_links = links_block.find_all("a")
        for club_link in club_links:
            club_page_url = f"{STUDENT_UNION_BASE_URL}{club_link.attrs['href']}"
            club_html = requests.get(club_page_url).text
            club_soup = BeautifulSoup(club_html, "html.parser")
            club_html_nodes.append(club_soup.find("div", {"class": "club-item-content"}))

        club_result.extend(parse_club_html_nodes(club_html_nodes))
        club_html_nodes = []
    return club_result


def lambda_handler(event, context):
    """
    Lambda entry-point
    """
    base_url = "https://www.ubcsuo.ca/club-directory-listing"
    clubs = []
    try:
        clubs = get_all_clubs(base_url)
        LOGGER.info(f"There are {len(clubs)} clubs: {json.dumps(clubs, indent=4)}")
        table = DYNAMODB_RESOURCE.Table(CLUBS_TABLE)
        for index, club_item in enumerate(clubs):
            club_item["clubId"] = str(index)
            table.put_item(Item=club_item)
        return {"status": "completed"}

    except Exception as error:
        detailed_exception(LOGGER)
        return {"error": "incomplete"}
