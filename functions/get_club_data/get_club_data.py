import hashlib
import time
import boto3
import os
import bs4
import requests
import json
import sys
import logging
from bs4 import BeautifulSoup
from requests import RequestException
from selenium import webdriver
from typing import List
from webdriver_manager.chrome import ChromeDriverManager
from common_lib import detailed_exception


# Log level
logging.basicConfig()
LOGGER = logging.getLogger()
LOGGER.setLevel(logging.INFO)


CLUBS_TABLE = os.environ["CLUBS_TABLE_NAME"]
S3_BUCKET_NAME = os.environ["BUCKET_NAME"]
DYNAMODB_RESOURCE = boto3.resource("dynamodb")

STUDENT_UNION_BASE_URL = "https://www.ubcsuo.ca"
STUDENT_UNION_CLUBS_URL = "https://www.ubcsuo.ca/club-directory"
CLUB_LISTING = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k",
                "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v",
                "w", "x", "y", "z"]


def parse_club_html_nodes(club_html_nodes: List[bs4.element.Tag]):
    """
    Given a list of HTML items that contain club information, the club information is parsed from
    them into a list of club item dictionaries
    :param club_html_nodes: List of Beautiful Soup HTML Tags
    :return: List of parsed clubs
    """
    clubs = []
    for node in club_html_nodes:
        club_item = {}
        club_item['title'] = node.find("h4").text

        image_link = node.find("img").attrs["src"]
        if image_link == "/sites/all/themes/ubcsuo/gfx/img_club.jpg":
            image_link = f"{STUDENT_UNION_BASE_URL}{image_link}"
        club_item["imageLink"] = image_link

        paragraphs = node.find_all("p")
        club_item["description"] = ""
        if len(paragraphs) == 0:
            club_item["description"] = "Null"
        else:
            for index, paragraph in enumerate(paragraphs):
                club_item["description"] = club_item["description"] + paragraphs[index].text + "\n"

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


def get_all_clubs(url: str):
    """
    Given the url for the clubs directory, it loops through letters of the alphabet, checks if clubs exist
    under that letter, searches the website HTML to find individual club pages, parses the individual club information
    and returns it in a list of dictionaries
    :param url: URL for club directory
    :return: List of dictionaries containing parsed club items
    """
    club_result = []
    club_html_nodes = []
    for letter in CLUB_LISTING:
        directory_url = f"{url}/{letter}"
        try:
            html_result = requests.get(directory_url).text
            html_soup = BeautifulSoup(html_result, "html.parser")
            links_block = html_soup.find("div", {"class": "view-content"})
            club_links = links_block.find_all("a")
            for club_link in club_links:
                if club_link.attrs['href'] == "/health-dental" \
                        or club_link.attrs['href'] == "/u-pass" \
                        or club_link.attrs['href'] == "/club-directory":
                    continue
                else:
                    club_page_url = f"{STUDENT_UNION_BASE_URL}{club_link.attrs['href']}"
                    try:
                        club_html = requests.get(club_page_url).text
                        club_soup = BeautifulSoup(club_html, "html.parser")
                        club_html_nodes.append(club_soup.find("div", {"class": "club-item-content"}))
                    except RequestException as e:
                        LOGGER.error(f"Network request for club:{club_page_url} failed")
                        print("Request Exception")
        except RequestException as e:
            LOGGER.error(f"Network request for clubs under letter:{letter} failed")
            print("Request Exception")
        club_result.extend(parse_club_html_nodes(club_html_nodes))
        club_html_nodes = []
    return club_result


def get_course_unions(url: str):
    """
    Uses Selenium to simulate navigating through the existing course-union lettered pages
    and grabbing course-union information from the HTML document. The course-union HTML items
    are parsed, saved into a dictionary and returned in a list
    :param url: URL for the course-union directory
    :return: List of parsed course union dictionaries
    """
    """
    NOTE: the letter list is hardcoded as the letter A contains an example course-union
    Further testing was not done on refining this since the SUO website will be rebuilt soon
    This is however the code that was used to get the initial list of course unions
    """
    letter_list = ["B", "C", "E", "G", "H", "M", "N", "P", "Q", "S", "V"]
    course_union_jsons = []
    chrome_options = webdriver.ChromeOptions()
    chrome_options.add_argument("--disable-notifications")
    driver = webdriver.Chrome(ChromeDriverManager().install(), chrome_options=chrome_options)
    driver.get(url)
    time.sleep(1)
    for letter in letter_list:
        button = driver.find_element_by_link_text(letter)
        button.click()
        time.sleep(1)
        node = driver.find_element_by_xpath('//*[@id="block-views-club-directory-block-2"]/div/div')
        soup = BeautifulSoup(node.get_attribute('innerHTML'), "html.parser")
        course_unions = soup.find_all("div", {"class": "club-item-content"})
        parsed_clubs = parse_club_html_nodes(course_unions)
        course_union_jsons.extend(parsed_clubs)

    return course_union_jsons


def lambda_handler(event, context):
    """
    Lambda entry-point
    """

    s3_client = boto3.client('s3')
    response = s3_client.get_object(Bucket=S3_BUCKET_NAME, Key="AllUBCOClubs.json")
    clubs_json = json.loads(response['Body'].read())
    LOGGER.info(json.dumps(str(clubs_json), indent=4))
    table = DYNAMODB_RESOURCE.Table(CLUBS_TABLE)
    for club in clubs_json:
        club["clubId"] = hashlib.md5(str(club["title"]).encode("utf-8")).hexdigest()
        table.put_item(Item=club)

    """
    NOTE: The snippet of code below was initially used for club + course union saving
    However, the clubs + course unions were manually categorised later on a local file 
    to improve the user experience for the pilot phase of the app
    Which was subsequently uploaded to S3, read from there and then persisted to DynamoDB without a TTL
    The code remains here as referential purposes for what an automated lambda would be like given the
    source data was categorised. The code above is a temporary replacement for the manual overloading of categorised
    club data
    """
    # club_link = "https://www.ubcsuo.ca/club-directory-listing"
    # course_union_link = "https://www.ubcsuo.ca/course-union-directory"
    # try:
    #     clubs = get_all_clubs(club_link)
    #     print(f"Received all clubs: {len(clubs)}")
    #     LOGGER.info(f"There are {len(clubs)} clubs")
    # except Exception as e:
    #     detailed_exception(LOGGER)
    #     return {"error": "Error in Parsing"}
    #
    # try:
    #     course_unions = get_course_unions(course_union_link)
    # except Exception as e:
    #     LOGGER.error("Error in Selenium parsing")
    #     detailed_exception(LOGGER)
    #     return {"error": "Error in Selenium parsing"}
    #
    # clubs.extend(course_unions)
    #
    # table = DYNAMODB_RESOURCE.Table(CLUBS_TABLE)
    # for club in clubs:
    #     club["clubId"] = hashlib.md5(str(club["title"]).encode("utf-8")).hexdigest()
    #     table.put_item(Item=club)

    return {"status": "completed"}



