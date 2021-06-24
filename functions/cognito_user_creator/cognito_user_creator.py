import boto3
import random
import string
import json
import cfnresponse
import logging

LOGGER = logging.getLogger()
LOGGER.setLevel(logging.INFO)

COGNITO_IDP_CLIENT = boto3.client('cognito-idp')


def id_generator(size=12, chars=string.ascii_uppercase + string.digits):
    """
    Helper function for cognito user credential generation, generates a random ID
    """
    return ''.join(random.choice(chars) for _ in range(size))


def pwd_generator(size=8):
    """
    Helper function for cognito user credential generation, generates a random password
    """
    lowerChars = string.ascii_lowercase
    upperChars = string.ascii_uppercase
    digits = string.digits
    specials = '%$#&[]'
    return random.choice(lowerChars) + random.choice(upperChars) + random.choice(digits) + random.choice(
        specials) + random.choice(lowerChars) + random.choice(upperChars) + random.choice(digits) + random.choice(
        specials)


def configure_cognito_lambda_handler(event, context):
    """
    Lambda function that creates a cognito identity pool user that is authorized to access the elasticsearch
    cluster via Kibana
    """
    LOGGER.info("Received event: %s" % json.dumps(event))

    try:
        if event['RequestType'] == 'Create':
            create_response = create(event)
            cfnresponse.send(event, context, cfnresponse.SUCCESS, create_response)
        if event['RequestType'] == 'Update':
            cfnresponse.send(event, context, cfnresponse.SUCCESS, {})
        elif event['RequestType'] == 'Delete':
            result_status = delete(event)
            cfnresponse.send(event, context, result_status, {})
    except:
        LOGGER.error("Error", exc_info=True)
        cfnresponse.send(event, context, cfnresponse.FAILED, {})


def create(event):
    """
    Helper function for the lambda entry point, creates and returns a new user
    """
    user_pool_id = event['ResourceProperties']['UserPoolId']

    kibana_user, kibana_password, kibana_email = get_user_credentials(event)
    add_user(user_pool_id, kibana_user, kibana_email, kibana_password)
    return {
        "KibanaUser": kibana_user,
        "KibanaPassword": kibana_password
    }


def delete(event):
    return cfnresponse.SUCCESS


def get_user_credentials(event):
    """
    Tries to generate default username and email credentials if none exists
    Generates a password, and then returns all 3 credentials
    """
    # If the username is present and is not an empty string, get the username, otherwise
    if 'kibanaUser' in event['ResourceProperties'] and event['ResourceProperties']['kibanaUser'] != '':
        kibanaUser = event['ResourceProperties']['kibanaUser']
    else:
        kibanaUser = 'kibana'

    if 'kibanaEmail' in event['ResourceProperties'] and event['ResourceProperties']['kibanaEmail'] != '':
        kibanaEmail = event['ResourceProperties']['kibanaEmail']
    else:
        kibanaEmail = f'{id_generator(6)}@example.com'

    kibanaPassword = pwd_generator()
    return kibanaUser, kibanaPassword, kibanaEmail


def add_user(userPoolId, kibanaUser, kibanaEmail, kibanaPassword):
    """
    Adds the input Cognito user with their given credentials to the given Cognito user pool
    and returns the cognito response
    """
    cognito_response = COGNITO_IDP_CLIENT.admin_create_user(
        UserPoolId=userPoolId,
        Username=kibanaUser,
        UserAttributes=[
            {
                'Name': 'email',
                'Value': kibanaEmail
            },
            {
                'Name': 'email_verified',
                'Value': 'True'
            }
        ],
        TemporaryPassword=kibanaPassword,
        MessageAction='SUPPRESS',
        DesiredDeliveryMediums=[
            'EMAIL'
        ]
    )
    LOGGER.info("create Cognito user {} for user pool {} successful.".format(kibanaUser, userPoolId))
    return cognito_response
