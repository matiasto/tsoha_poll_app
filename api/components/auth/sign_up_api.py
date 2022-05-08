from flask import request
from flask_restful import Resource
from ...services.validate import Validate
from ...db.auth import Auth


class SignUpAPI(Resource):
    """Handles the sing up.

    Args:
       Resource: RESTful resource
    """

    def post(self):
        """Validates input, checks for existing, and registers the new user."""

        email = request.json["email"]
        password = request.json["password"]
        firstname = request.json["firstname"]
        lastname = request.json["lastname"]

        message, code = Validate.signup(email, password, firstname, lastname)
        if code == 403:
            return message, code

        user = Auth.get(email)
        if user:
            return {"message": "email address is not available"}, 403
        Auth.register(email, password, firstname, lastname)
        return {"message": "successful signup"}, 200
