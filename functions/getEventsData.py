import logging
import requests
import json
import datetime

# Log level
logging.basicConfig()
LOGGER = logging.getLogger()
LOGGER.setLevel(logging.INFO)

# Get AWS region and necessary clients
# REGION = boto3.session.Session().region_name


def event_parser(event_json):
    """
    Parses individual event items from the REST API Response by keeping specific information
    and transforming some
    """
    venue = event_json["venue"]
    if venue["address"] == "Online":
        event_location = {"venue": "Online"}
    else:
        event_location = {
            "venue": venue["venue"],
            "address": venue["address"],
            "city": venue["city"],
            "country": venue["country"],
            "province": venue["province"],
            "zip": venue["zip"],
        }

    parsed_event = {
        'id': event_json['id'],
        "status": event_json['status'],
        "date_modified": event_json['modified'],
        "link": event_json['url'],
        "title": event_json['title'],
        "description": event_json['description'],
        "excerpt": event_json['excerpt'],
        "image": event_json['image'],
        "all_day": event_json['all_day'],
        "start_date": event_json['start_date'],
        "end_date": event_json['end_date'],
        "cost": event_json['cost'],
        "categories": [category["name"] for category in event_json["categories"]],
        "event_location": event_location,
    }
    return parsed_event


def parse_events(events_response):
    """
    Loops through the list of events in the REST API response and parses them
    :param events_response:
    :return:
    """
    events = []
    event_list = events_response['events']
    for event in event_list:
        events.append(event_parser(event))
    return events


def get_all_events(url):
    """
    Returns a list of all parsed events from the events page REST API, by looping through all result pages
    :param url: The events page REST API url
    :return: List of parsed and formatted events
    """
    events = []
    json_response = requests.get(url).json()
    events.extend(parse_events(json_response))
    while json_response.get('next_rest_url') is not None:
        next_page = json_response['next_rest_url']
        json_response = requests.get(next_page).json()
        events.extend(parse_events(json_response))
    return events


def lambda_handler(event, context):
    """
    """
    events_url = "https://events.ok.ubc.ca/wp-json/tribe/events/v1/events"
    events = get_all_events(events_url)
    LOGGER.debug(json.dumps(events, indent=4))
    # TODO Filter results by datetime and save/update to dynamoDB
    # TODO Consider TTL for data
    return events
