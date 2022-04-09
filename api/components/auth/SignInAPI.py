from flask import request, jsonify
from flask_restful import Resource
from flask_jwt_extended import create_access_token, set_access_cookies
from ...services.validate import Validate
from ...db.auth import User

class SignInAPI(Resource):
    def post(self):
        email = request.json["email"]
        password = request.json["password"]
        Validate.signin(email, password)
        user = User.get(email, password)
        message, code = Validate.credentials(user, password)
        if code == 403:
            return message, code
        response = jsonify({"msg": "login successful"})
        access_token = create_access_token(identity="example_user")
        set_access_cookies(response, access_token)
        return response
    