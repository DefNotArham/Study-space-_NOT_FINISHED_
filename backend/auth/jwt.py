import jwt
import os
from dotenv import load_dotenv
from datetime import datetime, timedelta

load_dotenv()

JWT_SECRET = os.getenv("JWT_SECRET")
ALGORITHM = "HS256"

def create_token(user_id):
    payload = {
        "user_id": user_id,
        "exp": datetime.utcnow() + timedelta(hours=24)
    }

    token = jwt.encode(payload, JWT_SECRET, algorithm=ALGORITHM)
    return token