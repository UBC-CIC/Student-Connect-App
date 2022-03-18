#  Needs access to ESdomain, DDB tables? other things?
# CUSTOM_ELASTICSEARCH_ESDOMAINENDPOINTOUTPUT
import boto3
import certifi
import json
import os
from aws_requests_auth.aws_auth import AWSRequestsAuth
from elasticsearch import Elasticsearch, RequestsHttpConnection
import logging
import time

# Log level
logging.basicConfig()
LOGGER = logging.getLogger()
if os.getenv('LOG_LEVEL') == 'DEBUG':
    LOGGER.setLevel(logging.DEBUG)
else:
    LOGGER.setLevel(logging.INFO)


REGION = boto3.session.Session().region_name
ES_ENDPOINT = os.environ['CUSTOM_ELASTICSEARCH_ESDOMAINENDPOINTOUTPUT']


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



# Entry point into the lambda function
def handler(event, context):
    """
    Lambda Entry-point. The event json payload will contain the fields:

    - index: Elasticsearch index to search
    - categories: Categories to search for
    """
    query_categories = event["arguments"]["categories"]
    es_index = event["arguments"]["index"]
    return search_es_index(es_index, query_categories)


def search_es_index(index, categories):
    """
    Performs a more-like-this search on the specified ES Index using the specified categories in the item
    :param index: Elasticsearch index to search in
    :param categories: Categories to compare in the searched documents
    :return: Returns the result of the Elasticsearch query
    """
    query_body = {
        "from": 0, "size": 30,
        "query": {
            "more_like_this": {
                "fields": [
                    "categories"
                ],
                "like": categories,
                # TODO refine the query as much as possible
                "min_term_freq": 1,
                "min_doc_freq": 2
            }
        }
    }
    start = time.time()
    es_result = ES_CLIENT.search(index=index, body=query_body)
    LOGGER.info(f"Response: {json.dumps(es_result, indent=4)}")
    LOGGER.info('REQUEST_TIME es_client.index {:10.4f}'.format(
        time.time() - start))
    return json.dumps(es_result)
