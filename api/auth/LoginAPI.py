from flask import request, jsonify
from flask_restful import Resource
from flask_jwt_extended import create_access_token, set_access_cookies
from api.db.db import db

class LoginAPI(Resource):
    def post(self):
        email = request.json.get("email", None)
        password = request.json.get("password", None)
        if email != "test" or password != "test":
            return {"msg": "Wrong email or password"}, 401
    
        response = jsonify({"msg": "login successful"})
        access_token = create_access_token(identity="example_user")
        set_access_cookies(response, access_token)
        return response
    