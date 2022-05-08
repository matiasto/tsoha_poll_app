from os import getenv
from app import app
from flask_restful import Api
from flask import send_from_directory
from flask_jwt_extended import (
    JWTManager, create_access_token,
    get_jwt_identity, get_jwt, set_access_cookies
)
from datetime import timedelta, datetime, timezone
from .components.auth.sign_in_api import SignInAPI
from .components.auth.sign_out_api import SignOutAPI
from .components.auth.sign_up_api import SignUpAPI
from .components.user.user_polls_api import UserPollsAPI
from .components.user.user_votes_api import UserVotesAPI
from .components.user.user_details_api import UserDetailsAPI
from .components.user.user_ratings_api import UserRatingsAPI
from .components.poll.poll_api import PollAPI
from .components.poll.polls_api import PollsAPI
from .components.poll.details_api import DetailsAPI
from .components.poll.reactivate_api import ReactivateAPI
from .components.poll.rate_api import RateAPI

app.config["SEND_FILE_MAX_AGE_DEFAULT"] = 0
app.config["JWT_COOKIE_SECURE"] = False
app.config["JWT_TOKEN_LOCATION"] = ["cookies"]
app.config["JWT_SECRET_KEY"] = getenv("SECRET_KEY")
app.config["JWT_ACCESS_TOKEN_EXPIRES"] = timedelta(hours=1)
jwt = JWTManager(app)


@jwt.invalid_token_loader
def invalid_token(token):
    return {"message", "invalid token"}


@app.after_request
def refresh_expiring_jwts(response):
    try:
        exp_timestamp = get_jwt()["exp"]
        now = datetime.now(timezone.utc)
        target_timestamp = datetime.timestamp(now + timedelta(minutes=30))
        if target_timestamp > exp_timestamp:
            access_token = create_access_token(identity=get_jwt_identity())
            set_access_cookies(response, access_token)
        return response
    except (RuntimeError, KeyError):
        return response


api = Api(app)

api.add_resource(SignInAPI, "/api/signin")
api.add_resource(SignOutAPI, "/api/signout")
api.add_resource(SignUpAPI, "/api/signup")
api.add_resource(PollAPI, "/api/poll/<int:poll_id>")
api.add_resource(PollsAPI, "/api/polls")
api.add_resource(DetailsAPI, "/api/poll/details/<int:poll_id>")
api.add_resource(ReactivateAPI, "/api/poll/reactivate/<int:poll_id>")
api.add_resource(RateAPI, "/api/poll/rate/<int:poll_id>")
api.add_resource(UserPollsAPI, "/api/user/polls")
api.add_resource(UserVotesAPI, "/api/user/votes")
api.add_resource(UserDetailsAPI, "/api/user/details/<int:poll_id>")
api.add_resource(UserRatingsAPI, "/api/user/ratings/<int:poll_id>")


@app.route("/")
def serve():
    return send_from_directory(app.static_folder, "index.html")


@app.errorhandler(404)
def not_found(e):
    return send_from_directory(app.static_folder, "index.html")
