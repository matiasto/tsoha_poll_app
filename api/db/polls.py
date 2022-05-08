from ..services.fetch_query import FetchQuery
from .db import db


class Polls:
    """DB methods related to all polls"""

    @staticmethod
    def get(user_id):
        """Retrieve all available polls.

        Does not include; users own polls, polls hes already
        voted for and deactivated polls.

        Args:
            user_id (int): to delimit the result

        Returns:
            query result
        """

        sql = FetchQuery.get_sql_query("get_poll_meta")
        result = db.session.execute(sql, {"user_id": user_id})
        return result.fetchall()

    @staticmethod
    def post(user_id: int, poll_title: str, poll_description: str, poll_credits: str, statements: list):
        """Create new poll"""
        
        sql = FetchQuery.get_sql_query("post_poll_meta")
        result = db.session.execute(
            sql, {"user_id": user_id,
                  "title": poll_title,
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
