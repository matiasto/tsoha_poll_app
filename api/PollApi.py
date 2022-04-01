import json
from flask import jsonify, request
from flask_restful import Resource
from db import db
from .to_json_format import FormatterTool


class PollApi(Resource):
    def get(self, poll_id):
        sql = "SELECT title, description, credits FROM polls WHERE poll_id=:id"
        result = db.session.execute(sql, {"id": poll_id})
        polls = result.fetchall()
        headers = ["title", "description", "credits"]
        meta = FormatterTool.to_json(headers, polls)[0]

        sql = "SELECT question_id, header, description FROM questions WHERE poll_id=:id"
        result = db.session.execute(sql, {"id": poll_id})
        questions = result.fetchall()
        headers = ["question_id", "header", "description"]
        data = FormatterTool.to_json(headers, questions)
        return jsonify({"meta": meta, "data": data})

    def post(self, poll_id):
        data = json.loads(request.data)
        for item in data:
            question_id = item["id"]
            votes = item["votes"]

            sql = """INSERT INTO answers (question_id, votes, sent_at) 
                            VALUES (:question_id, :votes, NOW())"""
            result = db.session.execute(sql, {"question_id": question_id,
                                              "votes": votes})
        db.session.commit()

    def delete(self, poll_id):
        sql = "UPDATE polls SET visible=FALSE WHERE poll_id=:id"
        db.session.execute(sql, {"id":poll_id})
        db.session.commit()