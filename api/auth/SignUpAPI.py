from flask import request, jsonify
from flask_restful import Resource
from flask_jwt_extended import create_access_token, set_access_cookies
from api.db.db import db

class SignUpAPI(Resource):
    def post(self):
        response = jsonify({"msg": "signup successful"})
        access_token = create_access_token(identity="example_user")
        set_access_cookies(response, access_token)
        return response
    