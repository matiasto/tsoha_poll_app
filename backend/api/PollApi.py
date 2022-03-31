from flask import request
from flask_restful import Resource
from db import db


class PollApi(Resource):
    def get(self, poll_id):
        sql = "SELECT * FROM polls WHERE poll_id=:id"
        result = db.session.execute(sql, {"id":poll_id})
        topic = result.fetchone()[0]
        sql = "SELECT id, choice FROM choices WHERE poll_id=:id"
        result = db.session.execute(sql, {"id":id})
        choices = result.fetchall()

    def delete(self, poll_id):
        pass