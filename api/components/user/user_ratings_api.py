import json
from flask_restful import Resource
from flask_jwt_extended import jwt_required, get_jwt_identity
from ...services.validate import Validate
from ...services.formatter_tool import FormatterTool
from ...db.user import User


class UserRatingsAPI(Resource):
    """Retrieves ratings related to users poll.

    Requires authentication.

    Args:
        Resource: RESTful resource
    """

    method_decorators = [jwt_required()]

    def get(self, poll_id):
        """Retrieves the ratings on the poll

        Validates the ownership of the poll, 
        and retrieves the data.

        Args:
            poll_id (int): Poll to get the ratings

        Returns:
            json response
        """

        user_id = get_jwt_identity()
        message, code = Validate.ownership(user_id, poll_id)
        if code == 403:
            return message, code
        details = User.ratings(poll_id)
        headers = ["poll_id", "user", "rating", "comment"]
        data = FormatterTool.to_json(headers, details)
        return json.dumps(data)
