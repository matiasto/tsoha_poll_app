from app import app
from flask_sqlalchemy import SQLAlchemy
from os import getenv
from dotenv import load_dotenv, find_dotenv

load_dotenv(find_dotenv())

app.config["SQLALCHEMY_DATABASE_URI"] = getenv("DATABASE_URL")
db = SQLAlchemy(app)
print(db.session.execute("SELECT 1").fetchone())