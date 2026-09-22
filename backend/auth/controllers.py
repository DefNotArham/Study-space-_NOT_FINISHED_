from database import get_connection
from pwdlib import PasswordHash

password_hash = PasswordHash.recommended()


# Register
def register(data):
    connection = get_connection()
    cursor = connection.cursor()

    try:
        hashed_password = password_hash.hash(data.password)

        with open("auth/sql/register.sql", "r") as file:
            sql = file.read()

        cursor.execute(
            sql,
            (data.email, data.username, hashed_password)
        )

        connection.commit()
        return {"message": "User successfully registered", "success": True}

    except Exception as error:
        print(str(error))
        connection.rollback()
        return {"message": str(error), "success": False}

    finally:
        cursor.close()
        connection.close()