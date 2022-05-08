from ..services.fetch_query import FetchQuery
from .db import db


class User:
    """DB methods related to user."""

    @staticmethod
    def get(user_id):
        """Retrieve users own polls

        Args:
            user_id (int): target user

        Returns:
            query result
        """

        sql = FetchQuery.get_sql_query("get_user_polls")
        result = db.session.execute(sql, {"user_id": user_id})
        return result.fetchall()

    @staticmethod
    def votes(user_id):
        """Retrieve users votes

        Args:
            user_id (int): target user

        Returns:
            query result
        """

        sql = FetchQuery.get_sql_query("get_user_votes")
        result = db.session.execute(sql, {"user_id": user_id})
        return result.fetchall()

    @staticmethod
    def details(user_id, poll_id):
        """Retrieve details on votes

        Args:
            user_id (int): target user
            poll_id (int): target poll

        Returns:
            query result
        """

        sql = FetchQuery.get_sql_query("get_user_votes_detailed")
        result = db.session.execute(sql, {"user_id": user_id,
                                          "poll_id": poll_id})
        return result.fetchall()

    @staticmethod
    def ratings(poll_id):
        """Retrieve ratings on users poll.

        Args:
            poll_id (int): target poll

        Returns:
            query result
        """

        sql = FetchQuery.get_sql_query("get_poll_ratings")
        result = db.session.execute(sql, {"poll_id": poll_id})
        return result.fetchall()

    @staticmethod
    def ownership(user_id, poll_id):
        """Check for ownership

        Used to validate users ownership of the poll

        Args:
            user_id (int)): target user
            poll_id (int): target poll

        Returns:
            query result
        """

        sql = FetchQuery.get_sql_query("validate_poll_ownership")
        result = db.session.execute(sql, {"user_id": user_id,
                                          "poll_id": poll_id})
        return result.fetchone()[0]

    @staticmethod
    def rating(user_id, poll_id):
        """Check for the validity of rate

        Check for existing rating

        Args:
            user_id (int): target user
            poll_id (int): target poll

        Returns:
            query result
        """

        sql = FetchQuery.get_sql_query("validate_user_rating")
        result = db.session.execute(sql, {"user_id": user_id,
                                          "poll_id": poll_id})
        return result.fetchone()[0]
