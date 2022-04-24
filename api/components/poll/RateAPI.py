from flask import request
from flask_restful import Resource
from flask_jwt_extended import jwt_required, get_jwt_identity
from ...services.validate import Validate
from ...db.poll import Poll


class RateAPI(Resource):
    method_decorators = [jwt_required()]

    def post(self, poll_id):
        user_id = get_jwt_identity()
        rating = request.json["rating"]
        comment = request.json["comment"]
        message, code = Validate.rating(user_id, poll_id, rating, comment)
        if code == 403:
            return message, code
        Poll.rate(user_id, poll_id, rating, comment)
        return {"message": "Succesfully rated"}, 200
