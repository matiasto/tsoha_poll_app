from flask import jsonify, request
from flask_restful import Resource
from db import db
from .to_json_format import FormatterTool



class PollApi(Resource):
    def get(self, poll_id):
        sql = "SELECT title, description, credits FROM polls WHERE poll_id=:id"
        result = db.session.execute(sql, {"id":poll_id})
        polls = result.fetchall()
        headers = ["title", "description", "credits"]
        meta = FormatterTool.to_json(headers, polls)

        sql = "SELECT question_id, header, description FROM questions WHERE poll_id=:id"
        result = db.session.execute(sql, {"id":poll_id})
        questions = result.fetchall()
        headers = ["question_id", "header", "description"]
        data = FormatterTool.to_json(headers, questions)
        return jsonify({"meta": meta, "data": data})

    def delete(self, poll_id):
        pass