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

def verify_token(token):
    try:
        payload = jwt.decode(token, JWT_SECRET, algorithms=[ALGORITHM])
        return payload
    except jwt.ExpiredSignatureError:
        return None
    except jwt.InvalidTokenError:
        return None

