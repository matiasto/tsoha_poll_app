import json
from flask import request
from flask_restful import Resource
from flask_jwt_extended import jwt_required
from ...services.to_json_format import FormatterTool
from ...services.validate import Validate
from ...db.poll import Poll


class PollAPI(Resource):
    method_decorators = [jwt_required()]

    def get(self, poll_id):
        questions = Poll.get_statements()
        headers = ["question_id", "header", "description"]
        data = FormatterTool.to_json(headers, questions)
        return json.dumps(data)

    def post(self, poll_id):
        data = json.loads(request.data)
        credits = data.pop()["credits"]
        message, code = Validate.votes(credits, data)
        if code == 403:
            return message, code
        Poll.post_votes(data)
        return {"message": "Succesfully submitted"}

    def delete(self, poll_id):
        Poll.delete_poll(poll_id)
        return {"message": "Succesfully deleted"}
