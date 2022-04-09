from email import message
import re

class Validate:
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