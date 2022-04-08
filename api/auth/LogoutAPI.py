from flask import jsonify
from flask_restful import Resource
from flask_jwt_extended import unset_jwt_cookies

class LogoutAPI(Resource):
    def post(self):
        response = jsonify({"msg": "logout successful"})
        unset_jwt_cookies(response)
        return response