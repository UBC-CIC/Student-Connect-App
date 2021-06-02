import time
import typing

import pytz
import requests
import feedparser
import json
from bs4 import BeautifulSoup
import pandas as pd
from datetime import datetime

from typing import Set

"""
File for development purposes, tests python code locally
"""

category_map = {
    "34": "Advising",
    "33": "Careers",
    "67": "Grad",
    "27": "Health &amp; Wellness",
    "32": "New to UBC",
    "28": "UBCO Life",
    "1": "Uncategorized"
}

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
                if "https://www.facebook.com/" in str(link.a.attrs["href"]):  # Check to ignore broken Facebook links
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
        for club_item_link in club_links:
            club_page_url = f"{STUDENT_UNION_BASE_URL}{club_item_link.attrs['href']}"
            club_html = requests.get(club_page_url).text
            club_soup = BeautifulSoup(club_html, "html.parser")
            club_html_nodes.append(club_soup.find("div", {"class": "club-item-content"}))
        new_clubs = parse_club_html_nodes(club_html_nodes)
        club_html_nodes = []
        print(f"clubs under letter {letter}: {len(new_clubs)}")
        print(f"club_result size: {len(club_result)}")
        club_result.extend(new_clubs)
    return club_result


with open("../parsed_data/newResult.json", "w") as file:
    time1 = time.time()
    final_clubs = get_all_clubs("https://www.ubcsuo.ca/club-directory-listing")
    print(len(final_clubs))
    # for index, club_item in enumerate(clubs):
    #     club_item["clubId"] = str(index)
    # file.write(json.dumps(clubs, indent=4))
    print(f"Time taken to save {len(final_clubs)} clubs: {time.time() - time1}")
    # file.write(str(requests.get("https://events.ok.ubc.ca/wp-json/tribe/events/v1/events").json()))
