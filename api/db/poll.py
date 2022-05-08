from ..services.fetch_query import FetchQuery
from .db import db


class Poll:
    """Indidual poll related DB methods."""

    @staticmethod
    def get(poll_id):
        """Retrieves polls statements

        Args:
            poll_id (int): statements to retrieve to

        Returns:
            query result
        """

        sql = FetchQuery.get_sql_query("get_poll_statements")
        result = db.session.execute(sql, {"poll_id": poll_id})
        return result.fetchall()

    @staticmethod
    def post(user_id, data: list):
        """Post users votes on the poll

        Args:
            user_id (int): voters id
            data (list): votes array
        """

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
        """Retrieve details on poll

        Args:
            poll_id (int): target poll

        Returns:
            query result
        """

        sql = FetchQuery.get_sql_query("get_statement_stats")
        result = db.session.execute(sql, {"poll_id": poll_id})
        return result.fetchall()

    @staticmethod
    def deactivate(poll_id):
        """Deactivates poll

        Args:
            poll_id (int): target poll
        """

        sql = FetchQuery.get_sql_query("deactivate_poll")
        db.session.execute(sql, {"poll_id": poll_id})
        db.session.commit()

    @staticmethod
    def reactivate(poll_id):
        """Reactivate poll

        Args:
            poll_id (int): target poll
        """

        sql = FetchQuery.get_sql_query("reactivate_poll")
        db.session.execute(sql, {"poll_id": poll_id})
        db.session.commit()

    @staticmethod
    def rate(user_id, poll_id, rating, comment):
        """Rate poll

        Args:
            user_id (int): raters id
            poll_id (int): target poll
            rating (int): rating 1 - 5
            comment (str): additional points
        """

        sql = FetchQuery.get_sql_query("rate_poll")
        db.session.execute(sql, {"poll_id": poll_id,
                                 "user_id": user_id,
                                 "rating": rating,
                                 "comment": comment})
        db.session.commit()
