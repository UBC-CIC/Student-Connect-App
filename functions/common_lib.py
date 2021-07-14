import logging
import json
import sys
import traceback
import pytz
from datetime import datetime, timedelta, timezone

"""
This file contains helper functions used by the lambdas
The file is copied by the deployment script into the individual lambda folders during deployment
This avoids repetition of the files in version control
"""


def detailed_exception(logger: logging.Logger):
    """
    https://towardsdatascience.com/why-you-should-never-ever-print-in-a-lambda-function-f997d684a705
    Logs an exception in detail and better readable format on CloudWatch
    :param logger: The instantiated logger object
    """
    exception_type, exception_value, exception_traceback = sys.exc_info()
    traceback_string = traceback.format_exception(exception_type, exception_value, exception_traceback)
    err_msg = json.dumps({
        "errorType": exception_type.__name__,
        "errorMessage": str(exception_value),
        "stackTrace": traceback_string
    }, indent=4)
    logger.error(err_msg)


def get_adjusted_unix_time(datetime_string: str, format_string: str, offset_hours: int):
    """
    Given a datetime string in a specific format, it adds the offset hours to the datetime objects
    and returns the result in Unix time format
    :param datetime_string: The datetime string to be modified
    :param format_string: The format of the datetime string, e.g "%Y-%m-%d %H:%M:%S"
    :param offset_hours: The number of hours to add to the datetime
    :return: Datetime in Unix time format
    """
    current_time = datetime.strptime(datetime_string, format_string)
    adjusted_time = current_time + timedelta(hours=offset_hours)
    return int(adjusted_time.replace(tzinfo=timezone.utc).timestamp())


# def get_filtered_items(ssm_client, og_list, new_list, data_name, date_field, logger):
#     try:
#         last_query_time = ssm_client.get_parameter(Name=f"{data_name}QueryTime")["Parameter"]["Value"]
#
#         for item in og_list:
#             if datetime.strptime(last_query_time, "%Y-%m-%d %H:%M:%S") \
#                     < datetime.strptime(item[f"{date_field}"], "%Y-%m-%d %H:%M:%S"):
#                 new_list.append(item)
#
#         ssm_client.put_parameter(Name=f"{data_name}QueryTime",
#                                  Value=str(datetime.now(tz=pytz.timezone("America/Vancouver")))[:-13],
#                                  Overwrite=True)
#
#     except ssm_client.exceptions.InternalServerError as e:
#         logger.error("Error in communicating with Parameter store")
#         detailed_exception(logger)
#
#
# def insert_into_ddb_with_ttl(dynamodb_resource, table_name, insertion_list, ttl_offset, date_field):
#     table = dynamodb_resource.Table(table_name)
#     # Create a TTL for each item and insert into DynamoDB
#     for item in insertion_list:
#         item["expiresOn"] = get_adjusted_unix_time(item[date_field], "%Y-%m-%d %H:%M:%S",
#                                                    ttl_offset * 24)
#         table.put_item(Item=item)
