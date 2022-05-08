from flask import request
from flask_restful import Resource
from ...services.validate import Validate
from ...db.auth import Auth


class SignUpAPI(Resource):
    def post(self):
        email = request.json["email"]
        password = request.json["password"]
        firstname = request.json["firstname"]
        lastname = request.json["lastname"]

        message, code = Validate.signup(email, password, firstname, lastname)
        if code == 403:
            return message, code

        user = Auth.get(email, password)
        if user:
            return {"message": "email address is not available"}, 403
        Auth.register(email, password, firstname, lastname)
        return {"message": "successful signup"}, 200
