from flask import request, jsonify
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
        Auth.register(email, password, firstname, lastname)
        return {"message": "successful signup"}, 200
    