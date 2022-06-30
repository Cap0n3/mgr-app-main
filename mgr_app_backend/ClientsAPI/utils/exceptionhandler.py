from rest_framework.views import exception_handler
from rest_framework.exceptions import APIException

class PasswordCheckFailed(APIException):
    '''
    Custom error to handle password check failure. Used when data update needs password confirmation.
    '''
    status_code = 403
    default_detail = 'Password check has failed ! String given does not match stored password.'
    default_code = 'forbidden'

def custom_exception_handler(exc, context):
    '''
    All error can be handle in this function (see https://www.django-rest-framework.org/api-guide/exceptions/#generic-error-views).
    '''
    # Call REST framework's default exception handler first,
    # to get the standard error response.
    response = exception_handler(exc, context)

    # Now add the HTTP status code to the response.
    if response is not None:
        response.data['status_code'] = response.status_code

    return response