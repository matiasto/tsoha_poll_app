from werkzeug.security import check_password_hash
import re

class Validate:
    @staticmethod
    def signin(email: str, password: str):
        regex = r'\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b'
        if not re.fullmatch(regex, email) or len(email) > 50:
            return {"Message": "invalid email!"}, 403
        elif len(password) > 50:
            return {"message": "invalid password"}, 403


    @staticmethod
    def credentials(user, password):
        if not user:
            return {"message": "invalid email"}, 403
        else:
            hash_value = user.password
            if check_password_hash(hash_value, password):
                return {"message": "successfully signed in"}, 200
            else:
                return {"message": "invalid password"}, 403

    @staticmethod
    def signup(email: str, password: str, firstname: str, lastname: str):
        message = None
        regex = r'\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b'
        if not re.fullmatch(regex, email) or len(email) > 50:
            message = {"Message": "invalid email!"}
        elif len(password) > 50:
            message = {"message": "password too long"}
        elif len(firstname) > 20:
            message = {"message": "firstname too long"}
        elif not firstname.isalpha():
            message = {"message": "invalid firstname"}
        elif len(lastname) > 20:
            message = {"message": "lastname too long"}
        elif not lastname.isalpha():
            message = {"message": "invalid lastname"}
        if not message:
            return {"message": "succesful signup"}, 200
        else:
            return message, 403

    @staticmethod
    def votes(credits: int, data: list):
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
        message = None
        if len(poll_title) > 100 or poll_title == "":
            message = {"message": "Error in title!"}
        elif len(poll_description) > 300:
            message = {"message": "Description is too long!"}
        elif poll_credits > 250 or poll_credits < 0:
            message = {"message": "Error in credits!"}
        if not message:
            return {"message": "valid"}, 200
        else:
            return message, 403

    @staticmethod
    def statements(statements: list):
        for i, statement in enumerate(statements, start=1):
            header = statement["header"]
            description = statement["description"]
            if len(header) > 100 or header == "":
                return {"message": f"Error in {i}.statement header!"}, 403
            if len(description) > 300:
                return {"message": f"Error in {i}.statement description!"}, 403
        return {"message": "valid"}, 200
