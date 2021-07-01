import hashlib
import time
import boto3
import os
import requests
import json
import sys
import logging
from bs4 import BeautifulSoup
from requests import RequestException
from selenium import webdriver
from webdriver_manager.chrome import ChromeDriverManager
from common_lib import detailed_exception

# sys.setrecursionlimit(3000)

# Log level
logging.basicConfig()
LOGGER = logging.getLogger()
LOGGER.setLevel(logging.INFO)


CLUBS_TABLE = os.environ["CLUBS_TABLE_NAME"]
DYNAMODB_RESOURCE = boto3.resource("dynamodb")

STUDENT_UNION_BASE_URL = "https://www.ubcsuo.ca"
STUDENT_UNION_CLUBS_URL = "https://www.ubcsuo.ca/club-directory"
CLUB_LISTING = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k",
                "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v",
                "w", "x", "y", "z"]


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


def get_all_clubs(url):
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


def get_course_unions(url):
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
    club_link = "https://www.ubcsuo.ca/club-directory-listing"
    course_union_link = "https://www.ubcsuo.ca/course-union-directory"

    try:
        clubs = get_all_clubs(club_link)
        print(f"Received all clubs: {len(clubs)}")
        LOGGER.info(f"There are {len(clubs)} clubs")
    except Exception as e:
        detailed_exception(LOGGER)
        return {"error": "Error in Parsing"}

    try:
        course_unions = get_course_unions(course_union_link)
    except Exception as e:
        LOGGER.error("Error in Selenium parsing")
        detailed_exception(LOGGER)
        return {"error": "Error in Selenium parsing"}

    clubs.extend(course_unions)

    table = DYNAMODB_RESOURCE.Table(CLUBS_TABLE)
    for club in clubs:
        club["clubId"] = hashlib.md5(str(club["title"]).encode("utf-8")).hexdigest()
        table.put_item(Item=club)

    # clubs_table = DYNAMODB_RESOURCE.Table(CLUBS_TABLE)
    # for index, club in enumerate(clubs_list):
    #     club["clubId"] = hashlib.md5(str(club["title"]).encode("utf-8")).hexdigest()
    #     clubs_table.put_item(Item=club)

    return {"status": "completed"}



