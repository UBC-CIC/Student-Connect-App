import requests

base_url = "https://events.ok.ubc.ca/wp-json/tribe/events/v1/events"
event_categories_url = "https://events.ok.ubc.ca/wp-json/tribe/events/v1/categories"
response = requests.get(base_url)
print(response.json())