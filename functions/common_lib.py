import logging
import json
import sys
import traceback
from datetime import datetime, timedelta, timezone


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


def get_adjusted_unix_time(datetime_string, format_string, offset_hours):
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


# print(get_adjusted_unix_time("2021-05-27 15:42:09", "%Y-%m-%d %H:%M:%S", 30 * 24))


