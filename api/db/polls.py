from ..services.fetch_queries import FetchQuery
from .db import db


class Polls:
    @staticmethod
    def get():
        sql = FetchQuery.get_sql_query("get_poll_meta")
        result = db.session.execute(sql)
        return result.fetchall()


    @staticmethod
    def post(poll_title: str, poll_description: str, poll_credits: str, statements: list):
        sql = FetchQuery.get_sql_query("post_poll_meta")
        result = db.session.execute(
            sql, {"title": poll_title,
                  "description": poll_description,
                  "credits": poll_credits}
        )
        poll_id = result.fetchone()[0]
        sql = FetchQuery.get_sql_query("post_poll_statement")
        for statement in statements:
            header = statement["header"]
            description = statement["description"]
            db.session.execute(sql, {"poll_id": poll_id,
                                     "header": header,
                                     "description": description})
        db.session.commit()
