from flask_restful import Resource
from flask_jwt_extended import jwt_required
from api.db.db import db

class ProfileAPI(Resource):
    method_decorators = [jwt_required()]

    def get(self):
        return {
            "name": "testi",
            "about": "this is a tester that tests things for testing purposes"
        }