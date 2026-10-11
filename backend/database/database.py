import os
import psycopg
from dotenv import load_dotenv
from pathlib import Path

load_dotenv()

DATABASE_URL = os.getenv("DATABASE_URL")

def get_connection():
    return psycopg.connect(DATABASE_URL)

def initialize_database():
    schema_path = Path(__file__).parent / "schemas.sql"
    schema_sql = schema_path.read_text(encoding="utf-8")

    with get_connection() as connection:
        with connection.cursor() as cursor:
            cursor.execute(schema_sql)

    print("Database tables initialized")