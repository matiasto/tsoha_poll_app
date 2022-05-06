from flask_restful import Resource
from flask_jwt_extended import jwt_required, get_jwt_identity
from ...services.validate import Validate
from ...db.poll import Poll


class ReactivateAPI(Resource):
    method_decorators = [jwt_required()]

    def post(self, poll_id):
        user_id = get_jwt_identity()
        message, code = Validate.ownership(user_id, poll_id)
        if code == 403:
            return message, code
        Poll.reactivate(poll_id)
        return {"message": "Succesfully activated"}, 200
