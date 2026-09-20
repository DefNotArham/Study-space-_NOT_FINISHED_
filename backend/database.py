import os
import psycopg
from dotenv import load_dotenv

load_dotenv()

DATABASE_URL = os.getenv("DATABASE_URL")

connection = psycopg.connect(DATABASE_URL)

print("Connected to PostgreSQL!")