from asyncore import poll
from ..services.fetch_query import FetchQuery
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
            vote = item["votes"]
            db.session.execute(sql, {"statement_id": statement_id,
                                     "user_id": user_id,
                                     "vote": vote})
        db.session.commit()

    @staticmethod
    def details(poll_id):
        sql = FetchQuery.get_sql_query("get_statement_stats")
        result = db.session.execute(sql, {"id": poll_id})
        return result.fetchall()

    @staticmethod
    def deactivate(poll_id):
        sql = FetchQuery.get_sql_query("deactivate_poll")
        db.session.execute(sql, {"id": poll_id})
        db.session.commit()

    @staticmethod
    def reactivate(poll_id):
        sql = FetchQuery.get_sql_query("reactivate_poll")
        db.session.execute(sql, {"id": poll_id})
        db.session.commit()

    @staticmethod
    def rate(user_id, poll_id, rating, comment):
        sql = FetchQuery.get_sql_query("rate_poll")
        db.session.execute(sql, {"poll_id": poll_id,
                                 "user_id": user_id,
                                 "rating": rating,
                                 "comment": comment})
        db.session.commit()
