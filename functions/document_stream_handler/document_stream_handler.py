import boto3
import certifi
import json
import os
from aws_requests_auth.aws_auth import AWSRequestsAuth
from elasticsearch import Elasticsearch, RequestsHttpConnection
from boto3.dynamodb.types import TypeDeserializer
import logging
import time

# Log level
from common_lib import detailed_exception

logging.basicConfig()
LOGGER = logging.getLogger()
if os.getenv('LOG_LEVEL') == 'DEBUG':
    LOGGER.setLevel(logging.DEBUG)
else:
    LOGGER.setLevel(logging.INFO)


REGION = boto3.session.Session().region_name
ES_ENDPOINT = os.environ['ES_DOMAIN']


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

# Connect to the elasticsearch cluster using aws authentication. The lambda function
# must have access in an IAM policy to the ES cluster.
ES_CLIENT = Elasticsearch(
    hosts=[{'host': ES_ENDPOINT, 'port': 443}],
    http_auth=AWS_AUTH,
    use_ssl=True,
    verify_certs=True,
    ca_certs=certifi.where(),
    timeout=120,
    connection_class=RequestsHttpConnection
)

# Used to convert low-level API style DynamoDB item data from streams to regular python dict style
deserializer = TypeDeserializer()


def handler(event, context):
    """
    Lambda entry point
    """
    try:
        for record in event.get('Records'):
            # document_id = record['dynamodb']['NewImage']['documentId']['S']
            # document_type = record['dynamodb']['NewImage']['documentType']['S']

            if record.get('eventName') == 'INSERT':
                # TODO Implement ES Insert
                # contact_id = record['dynamodb']['NewImage']['ContactId']['S']
                # end_time = record['dynamodb']['NewImage']['EndTime']['N']
                # caller_transcript = record['dynamodb']['NewImage']['Transcript']['S']
                deserialized_record = {k: deserializer.deserialize(v) for k, v in record['dynamodb']['NewImage'].items()}
                LOGGER.info(json.dumps(str(deserialized_record), indent=4))
                # serialize the body

                print("Create operation")

                # ES_CLIENT.create(index=document_type, id=document_id, body=document_body)

            elif record.get('eventName') == 'MODIFY':
                # TODO Implement ES Modify

                # serialize the body
                document_body = record['dynamodb']['NewImage']
                deserialized_record = {k: deserializer.deserialize(v) for k, v in record['dynamodb']['NewImage'].items()}
                LOGGER.info(json.dumps(str(deserialized_record), indent=4))
                # ES_CLIENT.update(index=document_type, id=document_id, body=document_body)

                print("modify operation")
            elif record.get('eventName') == 'DELETE':
                # TODO Implement ES Delete
                print("delete operation")
                deserialized_record = {k: deserializer.deserialize(v) for k, v in record['dynamodb']['OldImage'].items()}
                LOGGER.info(json.dumps(str(deserialized_record), indent=4))
                # ES_CLIENT.delete(index=document_type, id=document_id)

    except KeyError as e:
        detailed_exception(LOGGER)
