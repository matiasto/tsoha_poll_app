from ..services.fetch_queries import FetchQuery
from .db import db


class Poll:
    @staticmethod
    def get_statements():
        sql = FetchQuery.get_sql_query("get_poll_statements")
        result = db.session.execute(sql)
        return result.fetchall()


    @staticmethod
    def post_votes(data: list):
        sql = FetchQuery.get_sql_query("post_user_votes")
        for item in data:
            question_id = item["id"]
            votes = item["votes"]
            result = db.session.execute(sql, {"question_id": question_id,
                                              "votes": votes})
        db.session.commit()

    @staticmethod
    def delete_poll(poll_id):
        sql = FetchQuery.get_sql_query("delete_poll")
        db.session.execute(sql, {"id": poll_id})
        db.session.commit()
