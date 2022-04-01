from flask import jsonify, request
from flask_restful import Resource
from .to_json_format import FormatterTool
from db import db


class PollsApi(Resource):
    def get(self):
        sql = "SELECT poll_id, title, description, created_at FROM polls ORDER BY poll_id DESC"
        result = db.session.execute(sql)
        polls = result.fetchall()
        headers = ["poll_id", "title", "description", "created_at"]
        data = FormatterTool.to_json(headers, polls, to_json=True)
        return jsonify(data)

    def post(self):
        meta = request.json['meta']
        poll_title = meta["poll_title"]
        poll_description = meta["poll_description"]
        poll_credits = meta["credits_per_voter"]

        sql = """INSERT INTO polls (title, description, credits, created_at) 
                    VALUES (:title, :description, :credits, NOW()) RETURNING poll_id"""

        result = db.session.execute(
            sql, {"title": poll_title,
                  "description": poll_description,
                  "credits": poll_credits})

        poll_id = result.fetchone()[0]
        questions = request.json['poll']
        for question in questions:
            header = question["header"]
            description = question["description"]
            if header != "":
                if description == "":
                    description = None

                sql = """INSERT INTO questions (poll_id, header, description) 
                            VALUES (:poll_id, :header, :description)"""

                db.session.execute(sql, {"poll_id": poll_id,
                                         "header": header,
                                         "description": description})

        db.session.commit()
        return {
            "status": "SUCCESS",
            "message": "Poll submitted!"
        }
