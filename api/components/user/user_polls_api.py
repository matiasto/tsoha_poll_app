from flask import jsonify
from flask_restful import Resource
from flask_jwt_extended import jwt_required, get_jwt_identity
from ...services.formatter_tool import FormatterTool
from ...db.user import User


class UserPollsAPI(Resource):
    """Handles the retrieval of users own polls.

    Requires authentication.

    Args:
        Resource: RESTful resource
    """

    method_decorators = [jwt_required()]

    def get(self):
        """Retrieves the data on users poll.

        Returns:
            json response
        """

        user_id = get_jwt_identity()
        polls = User.get(user_id)
        headers = ["poll_id", "visible", "title",
                   "description", "created_at", "rating", "votes"]
        data = FormatterTool.to_json(headers, polls, to_json=True)
        return jsonify(data)
