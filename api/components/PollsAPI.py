from flask import jsonify, request
from flask_restful import Resource
from flask_jwt_extended import jwt_required
from .to_json_format import FormatterTool
from api.db.db import db

def bail_out(poll_id):
    sql = "UPDATE polls SET visible=0 WHERE poll_id=:id"
    db.session.execute(sql, {"id": poll_id})
    db.session.commit()


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
        if len(poll_title) > 100 or poll_title == "":
            return {"Message": "Error in title!"}, 403
        if len(poll_description) > 300:
            return {"message": "Description is too long!"}, 403
        if poll_credits > 250 or poll_credits < 0:
            return {"message": "Error in credits!"}, 403

        sql = """INSERT INTO polls (title, description, credits, visible, created_at)
                    VALUES (:title, :description, :credits, 1, NOW()) RETURNING poll_id"""

        result = db.session.execute(
            sql, {"title": poll_title,
                  "description": poll_description,
                  "credits": poll_credits}
        )

        poll_id = result.fetchone()[0]
        questions = request.json['poll']
        for question in questions:
            header = question["header"]
            description = question["description"]
            if len(header) > 100 or header == "":
                bail_out(poll_id)
                return {"Message": "Error in statement header!"}, 403
            if len(description) > 300:
                bail_out(poll_id)
                return {"Message": "Error in statement description!"}, 403
            if description == "":
                description = None

                sql="""INSERT INTO questions (poll_id, header, description)
                            VALUES (:poll_id, :header, :description)"""

                db.session.execute(sql, {"poll_id": poll_id,
                                         "header": header,
                                         "description": description})

        db.session.commit()
        return {"message": "Poll submitted!"}
