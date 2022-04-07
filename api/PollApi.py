import json
from flask import request
from flask_restful import Resource
from db import db
from .to_json_format import FormatterTool


class PollApi(Resource):
    def get(self, poll_id):
        sql = "SELECT question_id, header, description FROM questions WHERE poll_id=:id"
        result = db.session.execute(sql, {"id": poll_id})
        questions = result.fetchall()
        headers = ["question_id", "header", "description"]
        data = FormatterTool.to_json(headers, questions)
        return json.dumps(data)

    def post(self, poll_id):
        data = json.loads(request.data)
        credits = data.pop()["credits"]
        check = 0
        for item in data:
            question_id = item["id"]
            if not isinstance(question_id, int):
                return {
                    "status": 403,
                    "message": "forbidden question id!"
                }
            votes = item["votes"]
            check += votes ** 2
        if check > credits ** 2:
            return {
                "status": 403,
                "message": "credits overflow!"
            }
        for item in data:
            question_id = item["id"]
            votes = item["votes"]
            sql = """INSERT INTO answers (question_id, votes, sent_at) 
                            VALUES (:question_id, :votes, NOW())"""
            result = db.session.execute(sql, {"question_id": question_id,
                                              "votes": votes})
        db.session.commit()
        return {
            "status": 200,
            "message": "Succesfully submitted"
        }

    def delete(self, poll_id):
        sql = "UPDATE polls SET visible=0 WHERE poll_id=:id"
        db.session.execute(sql, {"id": poll_id})
        db.session.commit()
        return {
            "status": 200,
            "message": "Succesfully deleted"
        }
