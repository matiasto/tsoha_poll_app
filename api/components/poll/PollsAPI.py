from flask import jsonify, request
from flask_restful import Resource
from flask_jwt_extended import jwt_required, get_jwt_identity
from ...services.formatter_tool import FormatterTool
from ...services.validate import Validate
from ...db.polls import Polls


class PollsAPI(Resource):
    method_decorators = [jwt_required()]

    def get(self):
        polls = Polls.get()
        headers = ["poll_id", "title", "description", "credits", "created_at", "created_by", "rating", "votes"]
        data = FormatterTool.to_json(headers, polls, to_json=True)
        return jsonify(data)

    def post(self):
        user_id = get_jwt_identity()
        meta = request.json["meta"]
        poll_title = meta["poll_title"]
        poll_description = meta["poll_description"]
        poll_credits = int(meta["credits_per_voter"])
        message, code = Validate.meta(
            poll_title, poll_description, poll_credits)
        if code == 403:
            return message, code
        statements = request.json['poll']
        message, code = Validate.statements(statements)
        if code == 403:
            return message, code
        Polls.post(user_id, poll_title, poll_description,
                   poll_credits, statements)
        return {"message": "Poll submitted!"}, 200
