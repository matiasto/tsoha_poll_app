import json
from flask import request
from flask_restful import Resource
from flask_jwt_extended import jwt_required, get_jwt_identity
from ...services.formatter_tool import FormatterTool
from ...services.validate import Validate
from ...db.poll import Poll


class PollAPI(Resource):
    method_decorators = [jwt_required()]

    def get(self, poll_id):
        statements = Poll.get(poll_id)
        headers = ["question_id", "header", "description"]
        data = FormatterTool.to_json(headers, statements)
        return json.dumps(data)

    def post(self, poll_id):
        user_id = get_jwt_identity()
        data = json.loads(request.data)
        credits = data.pop()["credits"]
        message, code = Validate.votes(user_id, poll_id, credits, data)
        if code == 403:
            return message, code
        Poll.post(user_id, data)
        return {"message": "Succesfully submitted"}, 200

    def delete(self, poll_id):
        user_id = get_jwt_identity()
        message, code = Validate.ownership(user_id, poll_id)
        if code == 403:
            return message, code
        Poll.deactivate(poll_id)
        return {"message": "Succesfully deleted"}, 200
