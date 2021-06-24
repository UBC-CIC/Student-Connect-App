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

with open("../parsed_data/newResult2.json", "r") as file:

    esBlogHashes = ["2f434d0e5c1449fa1b9c8be737931f64", "82f6baa3fba3afca20189ca9f38fdc41", "e7695be943103497e6ed10212c10ca77", "9b3acc033f59530cba8a927a0874c809", "e72e78d11d2de027402b11e9b453b1ac", "ce236ca765a24e018e173beef90a10b2", "f928b5bedfe474eb35e830a5c424f430", "c6bc696772337764afd6da05e5ec152d", "97639050f4082d7e00cf2ed3f00e7a29", "d3839c3defceaa4bf6858a0088bdc357", "addcb3783722d0e665fa571b37fce8c6", "a1319bdbd257578ac1e9826ce6567c90", "08ee35c2a913fa239d8bec78d79668d6", "5ab1d51810864551864608a2ba6a1ba6", "0ad461bd8d591a36400fb5ee7a701393", "9694ca3e649ef003240cc5cfd9165224", "19fa8d53bad2ef56d7478282607f4b2f", "d9305903831369e1c2548eeaa07af2ec", "00947523a73348e73ee5bc5e5f5ef6fd", "68b658fe05bb789cc989bbf8ade9c1b9", "85df8b6e2cc702574b0a10d52b8de9a3", "788de37bd43f9936902c6635ab4e7233", "215b663fef41ea7827ff349233b12cab", "c04d31c40bd2c2588687870ecb57e4f5", "954f728dfc39b1ba6938f4d9e32ee5d3", "627f17100ef5940ebc3611db50a29345", "945654d683bb934406ce33cc25af9212", "e45cab654616f8d888cb9ecddac4ce33", "08f88f40dbcdf0870625419b7b284b5d", "f0db2b883dae9ceabc371f452e224ff3", "e15780dc53edd2af32f53eeacedeccf8", "e99644ae4d9cabd41076ff27455ab766", "e07c05bb9693b39ee20927bbe18c15d9"]

    eventsTableHashes = ["e72e78d11d2de027402b11e9b453b1ac", "945654d683bb934406ce33cc25af9212", "f05e60c662f5ead1a65a5462640420f9", "ce236ca765a24e018e173beef90a10b2", "85df8b6e2cc702574b0a10d52b8de9a3", "c04d31c40bd2c2588687870ecb57e4f5", "e99644ae4d9cabd41076ff27455ab766", "a1319bdbd257578ac1e9826ce6567c90", "788de37bd43f9936902c6635ab4e7233", "08ee35c2a913fa239d8bec78d79668d6", "d9a73a0ff030c6cb11d8b778f1227af0", "9694ca3e649ef003240cc5cfd9165224", "d3839c3defceaa4bf6858a0088bdc357", "9b3acc033f59530cba8a927a0874c809", "97639050f4082d7e00cf2ed3f00e7a29", "c268289285dfe031656e35af48cb24ce", "d9305903831369e1c2548eeaa07af2ec", "f928b5bedfe474eb35e830a5c424f430", "08f88f40dbcdf0870625419b7b284b5d", "2014e3c98a35c290fa77fec3c3475a6b", "00947523a73348e73ee5bc5e5f5ef6fd", "68b658fe05bb789cc989bbf8ade9c1b9", "627f17100ef5940ebc3611db50a29345", "1817de4fabd96cd3a5ba85f1c2721b7d", "c6bc696772337764afd6da05e5ec152d", "954f728dfc39b1ba6938f4d9e32ee5d3", "e07c05bb9693b39ee20927bbe18c15d9", "215b663fef41ea7827ff349233b12cab", "e7695be943103497e6ed10212c10ca77", "e15780dc53edd2af32f53eeacedeccf8", "bbe87d70e76e8423fb9e5efb8c3274c2"]


    for esHashString in esBlogHashes:
        if esHashString not in eventsTableHashes:
            print(esHashString)

    # json_response = feedparser.parse(requests.get("https://events.ok.ubc.ca/events/feed/").text)
    # file.write(json.dumps(json_response, indent=4))

    # events = get_all_events("https://events.ok.ubc.ca/wp-json/tribe/events/v1/events")
    # file.write(json.dumps(events, indent=4))

    # for index, club_item in enumerate(clubs):
    #     club_item["clubId"] = str(index)
    # file.write(json.dumps(clubs, indent=4))
    # file.write(str(requests.get("https://events.ok.ubc.ca/wp-json/tribe/events/v1/events").json()))
