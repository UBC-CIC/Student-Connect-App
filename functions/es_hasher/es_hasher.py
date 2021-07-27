import json
import logging
import boto3
import os
import certifi
import hashlib
from aws_requests_auth.aws_auth import AWSRequestsAuth
from boto3.dynamodb.conditions import Key
from elasticsearch import Elasticsearch, RequestsHttpConnection
from common_lib import detailed_exception

# Log level
logging.basicConfig()
LOGGER = logging.getLogger()
if os.environ["DEBUG_MODE"] == "true":
    LOGGER.setLevel(logging.DEBUG)
else:
    LOGGER.setLevel(logging.INFO)

# Get AWS region and necessary clients
ES_HASH_TABLE = os.environ["ES_HASH_TABLE_NAME"]
ES_ENDPOINT = os.environ['ES_DOMAIN']
DYNAMODB_RESOURCE = boto3.resource("dynamodb")
REGION = boto3.session.Session().region_name


# Create the auth token for the sigv4 signature
SESSION = boto3.session.Session()
CREDENTIALS = SESSION.get_credentials().get_frozen_credentials()
AWS_AUTH = AWSRequestsAuth(
    aws_access_key=CREDENTIALS.access_key,
    aws_secret_access_key=CREDENTIALS.secret_key,
    aws_token=CREDENTIALS.token,
    aws_host=ES_ENDPOINT,
    aws_region=REGION,
    aws_service='es'
)

# Instantiate the Elasticsearch python client with AWS credentials and an HTTP connection
ES_CLIENT = Elasticsearch(
    hosts=[{'host': ES_ENDPOINT, 'port': 443}],
    http_auth=AWS_AUTH,
    use_ssl=True,
    verify_certs=True,
    ca_certs=certifi.where(),
    timeout=120,
    connection_class=RequestsHttpConnection
)


def lambda_handler(event, context):
    """
    Lambda entry-point
    """
    try:
        # Get all hashes of all items currently in Elasticsearch via ESHash DynamoDB Table
        hash_table = DYNAMODB_RESOURCE.Table(ES_HASH_TABLE)
        response = hash_table.scan(FilterExpression=Key('documentType').eq(event['dataType']))
        es_hash_items_response = response["Items"]
        while response.get("LastEvaluatedKey") in response:
            response = hash_table.scan(FilterExpression=Key('documentType').eq(event['dataType']),
                                       ExclusiveStartKey=response["LastEvaluatedKey"])
            es_hash_items_response.extend(response["Items"])

        es_hash_items = []
        for response_item in es_hash_items_response:
            es_hash_items.append(response_item["documentHash"])

        # Update ESHashTable and Elasticsearch with respect to data sources
        table_name = event["dataType"]
        # Get all items from the table of the dataType being refreshed
        item_table = DYNAMODB_RESOURCE.Table(f"{table_name}Table")
        response = item_table.scan(ConsistentRead=True)
        table_items = response["Items"]
        while response.get("LastEvaluatedKey") in response:
            response = item_table.scan(ExclusiveStartKey=response["LastEvaluatedKey"])
            table_items.extend(response["Items"])

        # Hash all items in the item table
        item_hash_list = []
        for item in table_items:
            item_hash = hashlib.md5(str(item).encode("utf-8")).hexdigest()
            item_hash_list.append(item_hash)

        for es_hash_item_string in es_hash_items:
            if es_hash_item_string not in item_hash_list:
                # If an item hash is in the ESHashTable but not the datastore tables
                # That item is outdated and should be removed from ESHashTable and Elasticsearch
                hash_table.delete_item(Key={"documentHash": es_hash_item_string})
                ES_CLIENT.delete(index=table_name.lower(), id=es_hash_item_string)

        # Insert new items from item table into hashtable and Elasticsearch
        for index, item in enumerate(table_items):
            if item_hash_list[index] not in es_hash_items:
                # If an item hash is in the datastore table but not in the ESHashTable
                # That item is new and should be added to ESHashTable and Elasticsearch
                hash_table.put_item(Item={
                    "documentHash": item_hash_list[index],
                    "documentType": table_name
                })
                ES_CLIENT.index(index=table_name.lower(), body=item, id=item_hash_list[index])
    except Exception as e:
        detailed_exception(LOGGER)
        return {"status": "error"}

    return {"status": "completed"}
