from ..services.fetch_queries import FetchQuery
from werkzeug.security import generate_password_hash
from .db import db


class Auth:
    @staticmethod
    def get(email: str, password: str):
        sql = FetchQuery.get_sql_query("get_user")
        result = db.session.execute(sql, {"email": email})
        return result.fetchone()

    @staticmethod
    def register(email: str, password: str, firstname: str, lastname: str):
        hash_value = generate_password_hash(password)
        sql = FetchQuery.get_sql_query("register_user")
        db.session.execute(sql, {"email": email, "password": hash_value, "firstname": firstname, "lastname": lastname})
        db.session.commit()