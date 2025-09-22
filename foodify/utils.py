"""
Utility functions for the Foodify application
"""
from rest_framework.response import Response
from rest_framework import status


def create_standard_response(message, data=None, status_code=status.HTTP_200_OK):
    """
    Create a standardized API response format
    
    Args:
        message (str): Response message
        data (dict, optional): Response data
        status_code (int): HTTP status code
    
    Returns:
        Response: DRF Response object
    """
    response_data = {
        "message": message,
        "success": status_code < 400
    }
    
    if data is not None:
        response_data["data"] = data
    
    return Response(response_data, status=status_code)


def validate_required_fields(data, required_fields):
    """
    Validate that required fields are present in the data
    
    Args:
        data (dict): Data to validate
        required_fields (list): List of required field names
    
    Returns:
        tuple: (is_valid: bool, missing_fields: list)
    """
    missing_fields = [field for field in required_fields if not data.get(field)]
    return len(missing_fields) == 0, missing_fields