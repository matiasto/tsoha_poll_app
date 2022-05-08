import json
from flask_restful import Resource
from flask_jwt_extended import jwt_required, get_jwt_identity
from ...services.validate import Validate
from ...services.formatter_tool import FormatterTool
from ...db.poll import Poll


class DetailsAPI(Resource):
    """Retrieves the details on users own poll

    Requires authentication.

    Args:
        Resource: RESTful resource
    """

    method_decorators = [jwt_required()]

    def get(self, poll_id):
        """Retrieves data

        Validate users ownership over the poll and
        retrieve the details.

        Args:
            poll_id (int): poll details to get

        Returns:
            response: a json object holding the detailed information.
        """

        user_id = get_jwt_identity()
        message, code = Validate.ownership(user_id, poll_id)
        if code == 403:
            return message, code
        details = Poll.details(poll_id)
        headers = ["question_id", "header", "description", "average", "median"]
        data = FormatterTool.to_json(headers, details)
        return json.dumps(data)
