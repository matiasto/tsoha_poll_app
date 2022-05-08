import json
from flask import request
from flask_restful import Resource
from flask_jwt_extended import jwt_required, get_jwt_identity
from ...services.validate import Validate
from ...services.formatter_tool import FormatterTool
from ...db.poll import Poll


class PollAPI(Resource):
    """Handles the basic operations on individual polls.

    Requires authentication

    Args:
        Resource: RESTful resource
    """

    method_decorators = [jwt_required()]

    def get(self, poll_id):
        """Get poll data, mostly used in Vote.js component

        Args:
            poll_id (int): poll to get

        Returns:
            _type_: _description_
        """

        statements = Poll.get(poll_id)
        headers = ["question_id", "header", "description"]
        data = FormatterTool.to_json(headers, statements)
        return json.dumps(data)

    def post(self, poll_id):
        """Post user votes on the poll.

        Validate the right data, and post to DB.

        Args:
            poll_id (int): poll to vote for

        Returns:
            json response
        """

        user_id = get_jwt_identity()
        data = json.loads(request.data)
        credits = data.pop()["credits"]
        message, code = Validate.votes(user_id, poll_id, credits, data)
        if code == 403:
            return message, code
        Poll.post(user_id, data)
        return {"message": "Succesfully submitted"}, 200

    def delete(self, poll_id):
        """Deactivate poll.

        Confirme users ownership over the poll
        and deactivate

        Args:
            poll_id (int): poll to be deactivated

        Returns:
            json response
        """

        user_id = get_jwt_identity()
        message, code = Validate.ownership(user_id, poll_id)
        if code == 403:
            return message, code
        Poll.deactivate(poll_id)
        return {"message": "Succesfully deleted"}, 200
