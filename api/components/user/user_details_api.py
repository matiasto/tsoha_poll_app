import json
from flask_restful import Resource
from flask_jwt_extended import jwt_required, get_jwt_identity
from ...services.formatter_tool import FormatterTool
from ...db.user import User


class UserDetailsAPI(Resource):
    method_decorators = [jwt_required()]

    def get(self, poll_id):
        user_id = get_jwt_identity()
        details = User.details(user_id, poll_id)
        headers = ["question_id", "header", "description", "vote", "average", "median"]
        data = FormatterTool.to_json(headers, details)
        return json.dumps(data)