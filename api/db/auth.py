from ..services.fetch_queries import FetchQuery
from werkzeug.security import check_password_hash, generate_password_hash
from .db import db


class User:
    @staticmethod
    def get(email: str, password: str):
        sql = FetchQuery.get_sql_query("get_user")
        result = db.session.execute(sql, {"email": email})
        user = result.fetchone()    
        if not user:
            return {"message": "invalid email"}, 403
        else:
            hash_value = user.password
            if check_password_hash(hash_value, password):
                return {"message": "successfully signed in"}, 200
            else:
                return {"message": "invalid password"}, 403

    @staticmethod
    def register(email: str, password: str, firstname: str, lastname: str):
        hash_value = generate_password_hash(password)
        sql = FetchQuery.get_sql_query("register_user")
        db.session.execute(sql, {"email": email, "password": hash_value, "firstname": firstname, "lastname": lastname})
        db.session.commit()