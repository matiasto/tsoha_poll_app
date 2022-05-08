import json
from flask_restful import Resource
from flask_jwt_extended import jwt_required, get_jwt_identity
from ...services.formatter_tool import FormatterTool
from ...db.user import User


class UserDetailsAPI(Resource):
    """Handle the details of users voted polls.

    Requires authentication.

    Args:
        Resource: RESTful resource
    """

    method_decorators = [jwt_required()]

    def get(self, poll_id):
        """Get detailed data on voted polls

        Includes a comparison of users vote to average and median.

        Args:
            poll_id (int): poll to get the details on.

        Returns:
            json response
        """

        user_id = get_jwt_identity()
        details = User.details(user_id, poll_id)
        headers = ["statement_id", "header",
                   "description", "vote", "average", "median"]
        data = FormatterTool.to_json(headers, details)
        return json.dumps(data)
