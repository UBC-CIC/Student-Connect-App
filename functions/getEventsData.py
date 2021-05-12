import logging
import requests

# Log level
logging.basicConfig()
LOGGER = logging.getLogger()
LOGGER.setLevel(logging.INFO)

# Get AWS region and necessary clients
# REGION = boto3.session.Session().region_name


def lambda_handler(event, context):
    """
    """

    base_url = "https://events.ok.ubc.ca/wp-json/tribe/events/v1/events"
    event_categories_url = "https://events.ok.ubc.ca/wp-json/tribe/events/v1/categories"
    response = requests.get(base_url)
    print(response.json())
    return {'status': "completed"}
