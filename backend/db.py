from flask_sqlalchemy import SQLAlchemy
from os import getenv
from dotenv import load_dotenv, find_dotenv
from app import app

load_dotenv(find_dotenv())

app.config["SQLALCHEMY_DATABASE_URI"] = getenv("DATABASE_URL")
db = SQLAlchemy(app)