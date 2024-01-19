import os
import psycopg2
from dotenv import load_dotenv
from flask import Flask

load_dotenv()

app = Flask(__name__)
db_url = os.getenv("POSTGRES_URL")

def create_connection():
    return psycopg2.connect(db_url)

from app.views import scope, staff, tasks
from app.queries.create_tables import create_tables

create_tables()
