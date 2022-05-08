from flask import jsonify, request
from flask_restful import Resource
from flask_jwt_extended import jwt_required, get_jwt_identity
from ...services.validate import Validate
from ...services.formatter_tool import FormatterTool
from ...db.polls import Polls


class PollsAPI(Resource):
    """Handles operations on all polls.

    Requies authentication.

    Args:
        Resource: RESTful resource
    """

    method_decorators = [jwt_required()]

    def get(self):
        """Retrieves all available polls

        This includes; polls that are not created by the requesting user,
        polls the user has already voted, and hidden/deactivated polls.


        Returns:
            json response of all the availabel polls.
        """

        user_id = get_jwt_identity()
        polls = Polls.get(user_id)
        headers = ["poll_id", "title", "description", "credits",
                   "created_at", "created_by", "rating", "votes"]
        data = FormatterTool.to_json(headers, polls, to_json=True)
        return jsonify(data)

    def post(self):
        """Creates a new poll.

        Check for validity of input
        and registers the poll to database.

        Returns:
            json response
        """
        
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
