from flask_restful import Resource
from flask_jwt_extended import jwt_required, get_jwt_identity
from ...services.validate import Validate
from ...db.poll import Poll


class ReactivateAPI(Resource):
    """Handles the reactivation of poll.

    Args:
        Resource: RESTful resource
    """

    method_decorators = [jwt_required()]

    def post(self, poll_id):
        """Reactivate the poll

        Requires authentication.

        Validate the ownership of the poll and 
        then reactivate.

        Args:
            poll_id (int): poll to be activated

        Returns:
            json response
        """

        user_id = get_jwt_identity()
        message, code = Validate.ownership(user_id, poll_id)
        if code == 403:
            return message, code
        Poll.reactivate(poll_id)
        return {"message": "Succesfully activated"}, 200
