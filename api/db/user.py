from ..services.fetch_query import FetchQuery
from .db import db


class User:
    @staticmethod
    def get(user_id):
        sql = FetchQuery.get_sql_query("get_user_polls")
        result = db.session.execute(sql, {"id": user_id})
        return result.fetchall()

    @staticmethod
    def votes(user_id):
        sql = FetchQuery.get_sql_query("get_user_votes")
        result = db.session.execute(sql, {"id": user_id})
        return result.fetchall()

    @staticmethod
    def ownership(user_id, poll_id):
        sql = FetchQuery.get_sql_query("validate_poll_ownership")
        result = db.session.execute(sql, {"user_id": user_id,
                                          "poll_id": poll_id})
        return result.fetchone()[0]

    @staticmethod
    def rating(user_id, poll_id):
        sql = FetchQuery.get_sql_query("validate_user_rating")
        result = db.session.execute(sql, {"user_id": user_id,
                                          "poll_id": poll_id})
        return result.fetchone()[0]
