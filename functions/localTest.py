import hashlib
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


def event_parser(event_json):
    """
    Parses individual event items from the REST API Response by keeping specific information
    and transforming some

    :param event_json: Individual JSON item to format
    :return: Parsed JSON formatted Event item dictionary
    """
    venue = event_json["venue"]
    if venue.get("address") == "Online":
        event_location = {"venue": "Online"}
    else:
        event_location = {
            "venue": venue.get("venue", "Null"),
            "address": venue.get("address", "Null"),
            "city": venue.get("city", "Null"),
            "country": venue.get("country", "Null"),
            "province": venue.get("province", "Null"),
            "zip": venue.get("zip", "Null"),
        }
    parsed_event = {
        "eventId": str(event_json.get("id", "Null")),
        "status": event_json.get("status", "Null"),
        "dateModified": event_json.get("modified", "Null"),
        "link": event_json.get("url", "Null"),
        "title": event_json.get("title", "Null"),
        "description": event_json.get("description", "Null"),
        "excerpt": event_json.get("excerpt", "Null"),
        "allDay": event_json.get("all_day", "Null"),
        "startDate": event_json.get("start_date", "Null"),
        "endDate": event_json.get("end_date", "Null"),
        "cost": event_json.get("cost", "Null"),
        "categories": [category["name"] for category in event_json.get("categories", "Null")],
        "eventLocation": event_location,
    }

    # Check if event has an image included or not
    if event_json.get("image") is False:
        parsed_event["fullImage"] = False
        parsed_event["thumbnailImage"] = False
    else:
        parsed_event["fullImage"] = event_json["image"]["url"],
        parsed_event["thumbnailImage"] = event_json["image"]["sizes"]["thumbnail"]["url"],

    return parsed_event


def parse_events(events_response):
    """
    Loops through the list of events in the REST API response and parses them

    :param events_response:
    :return: JSON formatted list of event items
    """
    events = []
    event_list = events_response["events"]
    for event in event_list:
        events.append(event_parser(event))
    return events


def get_all_events(url):
    """
    Returns a list of all parsed events from the events page REST API, by looping through all result pages

    :param url: The events page REST API url
    :return: JSON formatted list of parsed events
    """
    events = []
    json_response = requests.get(url).json()
    events.extend(parse_events(json_response))
    while json_response.get("next_rest_url") is not None:
        next_page = json_response["next_rest_url"]
        json_response = requests.get(next_page).json()
        events.extend(parse_events(json_response))
    return events

with open("../parsed_data/AllUBCOClubs.json", "r") as file:

    items = json.load(file)
    categorySet = set()
    for item in items:
        for category in item.get("categories"):
            categorySet.add(category)

    print(categorySet)

    # events = get_all_events("https://events.ok.ubc.ca/wp-json/tribe/events/v1/events")
    # file.write(json.dumps(events, indent=4))

    # for index, club_item in enumerate(clubs):
    #     club_item["clubId"] = str(index)
    # file.write(json.dumps(clubs, indent=4))
    # file.write(str(requests.get("https://events.ok.ubc.ca/wp-json/tribe/events/v1/events").json()))
