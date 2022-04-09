from flask import jsonify, request
from flask_restful import Resource
from flask_jwt_extended import jwt_required
from ...services.to_json_format import FormatterTool
from ...services.validate import Validate
from api.db.db import db


class PollsAPI(Resource):
    method_decorators = [jwt_required()]

    def get(self):
        sql = "SELECT poll_id, title, description, credits, created_at FROM polls WHERE visible=1 ORDER BY poll_id DESC"
        result = db.session.execute(sql)
        polls = result.fetchall()
        headers = ["poll_id", "title", "description", "credits", "created_at"]
        data = FormatterTool.to_json(headers, polls, to_json=True)
        return jsonify(data)

    def post(self):
        meta = request.json['meta']
        poll_title = meta["poll_title"]
        poll_description = meta["poll_description"]
        poll_credits = int(meta["credits_per_voter"])
        message, code = Validate.meta(
            poll_title, poll_description, poll_credits)
        if code == 403:
            return message, code

        sql = """INSERT INTO polls (title, description, credits, visible)
                    VALUES (:title, :description, :credits, 1) RETURNING poll_id"""

        result = db.session.execute(
            sql, {"title": poll_title,
                  "description": poll_description,
                  "credits": poll_credits}
        )

        poll_id = result.fetchone()[0]
        statements = request.json['poll']
        message, code = Validate.statements(statements)
        if code == 403:
            return message, code
        for statement in statements:
            header = statement["header"]
            description = statement["description"]

            sql = """INSERT INTO questions (poll_id, header, description)
                        VALUES (:poll_id, :header, :description)"""

            db.session.execute(sql, {"poll_id": poll_id,
                                     "header": header,
                                     "description": description})

        db.session.commit()
        return {"message": "Poll submitted!"}, 200
