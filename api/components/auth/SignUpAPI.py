from flask import request, jsonify
from flask_restful import Resource
from flask_jwt_extended import create_access_token, set_access_cookies
from api.db.db import db
import re

class SignUpAPI(Resource):
    def post(self):
        email = request.json["email"]
        password = request.json["password"]
        firstname = request.json["firstname"]
        lastname = request.json["lastname"]

        regex = r'\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b'
        if not re.fullmatch(regex, email) or len(email) > 50:
            return {"Message": "invalid email!"}, 403
        if len(password) > 50:
            return {"message": "password too long"}, 403
        if len(firstname) > 20:
            return {"message": "firstname too long"}, 403
        if not firstname.isalpha():
            return {"message": "invalid firstname"}, 403
        if len(lastname) > 20:
            return {"message": "lastname too long"}, 403
        if not lastname.isalpha():
            return {"message": "invalid lastname"}, 403
        print(email, password, lastname, lastname)
    