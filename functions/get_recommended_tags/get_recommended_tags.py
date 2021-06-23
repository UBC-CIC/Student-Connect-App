import logging
from datetime import datetime
import boto3
import os
import json
import certifi
import hashlib
from aws_requests_auth.aws_auth import AWSRequestsAuth
from elasticsearch import Elasticsearch, RequestsHttpConnection


# Log level
from common_lib import detailed_exception

logging.basicConfig()
LOGGER = logging.getLogger()
if os.environ["DEBUG_MODE"] == "true":
    LOGGER.setLevel(logging.DEBUG)
else:
    LOGGER.setLevel(logging.INFO)


category_graph = {
    "Biology": {
        "links": []
    },
    "Physics": {
        "links": []
    }
}


def lambda_handler(event, context):
    """
    Lambda entry-point
    """
    current_tags = event["tags"]
    recommended_tags = set()
    for tag in current_tags:
        for category in category_graph[tag]["links"]:
            recommended_tags.add(category)

    return recommended_tags
