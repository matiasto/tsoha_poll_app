from ..services.fetch_queries import FetchQuery
from .db import db


class Poll:
    @staticmethod
    def get(poll_id):
        sql = FetchQuery.get_sql_query("get_poll_statements")
        result = db.session.execute(sql, {"id": poll_id})
        return result.fetchall()

    @staticmethod
    def post(user_id, data: list):
        sql = FetchQuery.get_sql_query("post_user_votes")
        for item in data:
            statement_id = item["id"]
            votes = item["votes"]
            db.session.execute(sql, {"statement_id": statement_id,
                                     "user_id": user_id,
                                     "votes": votes})
        db.session.commit()

    @staticmethod
    def delete(poll_id):
        sql = FetchQuery.get_sql_query("delete_poll")
        db.session.execute(sql, {"id": poll_id})
        db.session.commit()
