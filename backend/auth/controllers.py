from database import get_connection
from pwdlib import PasswordHash

password_hash = PasswordHash.recommended()

### Register

def register(data):
    connection = get_connection()
    cursor = connection.cursor()

    hashed_password = password_hash.hash(data.password)

    with open ("auth/sql/register.sql", "r") as file:
        sql = file.read()

    cursor.execute(
        sql,
        (data.email,data.username,hashed_password)
    )

    connection.commit()

    cursor.close()
    connection.close()
    return {"message:": "User registered successfully"}
