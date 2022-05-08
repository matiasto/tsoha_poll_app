from werkzeug.security import check_password_hash
import re
from ..db.user import User


class Validate:
    """Validate different inputs

    Used to validate inputs before applying
    app logic.

    Returns:
        json response.
    """

    @staticmethod
    def signin(email: str, password: str):
        """Validate sing in input data."""

        regex = r'\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b'
        if not re.fullmatch(regex, email) or len(email) > 50:
            return {"message": "Email in wrong format!"}, 403
        elif len(password) > 50:
            return {"message": "Password in wrong format"}, 403
        return {"message": "ok"}, 200

    @staticmethod
    def credentials(user, password):
        """Confirm credentials"""

        if not user:
            return {"message": "Email does not exist"}, 403
        else:
            hash_value = user.password
            if check_password_hash(hash_value, password):
                return {"message": "Successfully signed in"}, 200
            else:
                return {"message": "Password incorrect"}, 403

    @staticmethod
    def signup(email: str, password: str, firstname: str, lastname: str):
        """Validate sign up data."""

        message = None
        regex = r'\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b'
        if not re.fullmatch(regex, email) or len(email) > 50:
            message = {"message": "invalid email!"}
        elif len(password) > 50:
            message = {"message": "password too long (max 50 characters)"}
        elif len(password) < 4:
            message = {"message": "password too short (atleast 4 characters)"}
        elif len(firstname) < 2:
            message = {"message": "firstname too short"}
        elif not firstname.isalpha():
            message = {
                "message": "invalid firstname (only alphabetic characters are allowed)"}
        elif len(firstname) > 20:
            message = {"message": "firstname too long"}
        elif len(lastname) < 2:
            message = {"message": "lastname too short"}
        elif not lastname.isalpha():
            message = {
                "message": "invalid lastname (only alphabetic characters are allowed)"}
        elif len(lastname) > 20:
            message = {"message": "lastname too long"}
        if not message:
            return {"message": "succesful signup"}, 200
        else:
            return message, 403

    @staticmethod
    def votes(user_id, poll_id, credits: int, data: list):
        """Validate vote data"""

        voted_polls = list(
            filter(lambda x: x[0] == poll_id, User.votes(user_id)))
        if voted_polls:
            return {"message": "can not vote multiple times!"}, 403
        check = 0
        for item in data:
            question_id = item["id"]
            if not isinstance(question_id, int):
                return {"message": "forbidden question id!"}, 403
            votes = item["votes"]
            check += votes ** 2
        if check > credits ** 2:
            return {"message": "credits overflow!"}, 403
        return {"message": "valid!"}, 200

    @staticmethod
    def meta(poll_title: str, poll_description: str, poll_credits: int):
        """Validate meta data in poll creation"""

        message = None
        if len(poll_title) > 100 or poll_title == "":
            message = {"message": "Invalid title!"}
        elif len(poll_description) > 300:
            message = {"message": "Description is too long!"}
        elif poll_credits > 250 or poll_credits < 0:
            message = {"message": "Invalid credits!"}
        if not message:
            return {"message": "valid"}, 200
        else:
            return message, 403

    @staticmethod
    def statements(statements: list):
        """Validate statements in poll creation"""

        for i, statement in enumerate(statements, start=1):
            header = statement["header"]
            description = statement["description"]
            if len(header) > 100 or header == "":
                return {"message": f"Error in {i}.statement header!"}, 403
            if len(description) > 300:
                return {"message": f"Error in {i}.statement description!"}, 403
        return {"message": "valid"}, 200

    @staticmethod
    def ownership(user_id, poll_id):
        """Validate poll ownership"""

        if not User.ownership(user_id, poll_id):
            return {"message": "no ownership!"}, 403
        return {"message": "valid"}, 200

    @staticmethod
    def rating(user_id, poll_id, rating, comment):
        """Validate rating"""

        if not User.rating(user_id, poll_id):
            return {"message": "existing rating"}, 403
        if rating > 5 or rating < 0:
            return {"message": "invalid rating"}, 403
        if len(comment) > 300:
            return {"message": "Description is too long!"}, 403
        return {"message": "valid"}, 200
