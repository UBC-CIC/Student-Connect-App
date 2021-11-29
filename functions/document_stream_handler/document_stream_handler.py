import boto3
import certifi
import json
import os
import logging
from aws_requests_auth.aws_auth import AWSRequestsAuth
from elasticsearch import Elasticsearch, RequestsHttpConnection
from boto3.dynamodb.types import TypeDeserializer
from common_lib import detailed_exception

# Log level
logging.basicConfig()
LOGGER = logging.getLogger()
if os.getenv('LOG_LEVEL') == 'DEBUG':
    LOGGER.setLevel(logging.DEBUG)
else:
    LOGGER.setLevel(logging.INFO)

REGION = boto3.session.Session().region_name
ES_ENDPOINT = os.environ['ES_DOMAIN']
S3_CLIENT = boto3.client("s3")
S3_BUCKET_NAME = os.environ["BUCKET_NAME"]

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

# Used to convert low-level API style DynamoDB item data from DynamoDB Streams to regular python dict style
deserializer = TypeDeserializer()


def handler(event, context):
    """
    Lambda entry point
    Reads the DynamoDB Stream records of the document table everytime a change is made, and reflects that
    INSERT, MODIFY or REMOVE event change into Elasticsearch accordingly
    """
    try:
        for record in event.get('Records'):
            if record.get('eventName') == 'INSERT' or record.get('eventName') == 'MODIFY':
                LOGGER.info(f'{record.get("eventName")} Operation')

                deserialized_record = {k: deserializer.deserialize(v) for k, v in
                                       record['dynamodb']['NewImage'].items()}

                LOGGER.info(json.dumps(str(deserialized_record), indent=4))

                deserialized_record.pop('expiresOn')
                deserialized_record.pop('documentType')
                deserialized_record.pop('documentId')

                ES_CLIENT.index(index=record['dynamodb']['NewImage']['documentType']['S'],
                                id=record['dynamodb']['NewImage']['documentId']['S'],
                                body=deserialized_record)

            elif record.get('eventName') == 'REMOVE':
                LOGGER.info("REMOVE Operation")

                deserialized_record = {k: deserializer.deserialize(v) for k, v in
                                       record['dynamodb']['OldImage'].items()}

                LOGGER.info(json.dumps(str(deserialized_record), indent=4))

                ES_CLIENT.delete(index=deserialized_record['documentType'], id=deserialized_record['documentId'])

    except KeyError as key_error:
        detailed_exception(LOGGER)
    except Exception as error:
        detailed_exception(LOGGER)