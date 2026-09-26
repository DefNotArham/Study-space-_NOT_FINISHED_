from backend.database.database import get_connection
from pwdlib import PasswordHash
from psycopg.errors import UniqueViolation

password_hash = PasswordHash.recommended()


# Register
def register(data):
    connection = get_connection()
    cursor = connection.cursor()

    try:
        ## Password error handling
        if data.password != data.confirmPassword:
            return {"message": "Passwords must be the same", "success": False}
        

        hashed_password = password_hash.hash(data.password)

        with open("auth/sql/register.sql", "r") as file:
            sql = file.read()

        cursor.execute(
            sql,
            (data.email, data.username, hashed_password)
        )

        connection.commit()
        return {"message": "User successfully registered", "success": True}
    
    except UniqueViolation as error:
        connection.rollback()

        if "users_email_key" in str(error):
            return {"message": "Email already exists", "success": False}

        if "users_username_key" in str(error):
            return {"message": "User allready exists", "success": False}

        return {"message": "User already exists", "success": False}

    except Exception as error:
        print(str(error))
        connection.rollback()
        return {"message": str(error), "success": False}

    finally:
        cursor.close()
        connection.close()

## Login
def login(data):
    connection = get_connection()
    cursor = connection.cursor()

    try:
        with open("auth/sql/login.sql", "r") as file:
            sql = file.read()

        cursor.execute(sql,data.eamil)
        user = cursor.fetchone()

        if not user:
            return {"message": "User does not exist", "success": False}

    except Exception as error:
        print(str(error))
        connection.rollback()

        return {"message": str(error), "success": False}