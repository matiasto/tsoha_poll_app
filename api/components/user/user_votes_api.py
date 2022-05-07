from flask import jsonify
from flask_restful import Resource
from flask_jwt_extended import jwt_required, get_jwt_identity
from ...db.user import User
from ...services.formatter_tool import FormatterTool

class UserVotesAPI(Resource):
    method_decorators = [jwt_required()]

    def get(self):
        user_id = get_jwt_identity()
        polls = User.votes(user_id)
        headers = ["poll_id", "visible", "title", "sent_at", "existing_rating"]
        data = FormatterTool.to_json(headers, polls, to_json=True)
        return jsonify(data)