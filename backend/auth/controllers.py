from database import get_connection

### Register

def register(data):
    connection = get_connection()

    return {"message": "Register logic"}