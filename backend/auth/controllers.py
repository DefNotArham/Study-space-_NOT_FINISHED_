from database.database import get_connection

from pwdlib import PasswordHash
from psycopg.errors import UniqueViolation

from .jwt import create_token, verify_token
import secrets
from datetime import datetime, timedelta

from .mail.mail import send_verification_email

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

        user_id = cursor.fetchone()[0]
        verification_token = secrets.token_urlsafe(32)

        with open("auth/sql/create_verification_token.sql", "r") as file:
            verificationSql = file.read()

        cursor.execute(
            verificationSql,
            (user_id, verification_token, datetime.utcnow() + timedelta(minutes=15) )
        )

        connection.commit()

        try:
            send_verification_email(data.email, verification_token)
        except Exception as error:
            print(f"Failed to send verification email: {error}")
            return {"message": "Account created, but we could not send the verification email.", "success": False}

        return {"message": "User successfully registered", "success": True}
    
    except UniqueViolation as error:
        connection.rollback()

        if "users_email_key" in str(error):
            return {"message": "Email already exists", "success": False}

        if "users_username_key" in str(error):
            return {"message": "Username already exists", "success": False}

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

        cursor.execute(sql, (data.email,))
        user = cursor.fetchone()

        if not user:
            return {"message": "User does not exist", "success": False}

        if not user[4]:
            return { "message": "Please verify your email before logging in.", "success": False}

        stored_password = user[3]

        if not password_hash.verify(data.password, stored_password):
            return {"message": "Invalid password", "success": False}

        token = create_token(user[0])

        return {
            "message": "Login successful", 
            "success": True, 
            "user": {
            "id": user[0],
            "email": user[1],
            "username": user[2]
            }, 
            "token": token
        }

    except Exception as error:
        print(str(error))
        connection.rollback()

        return {"message": str(error), "success": False}
    finally:
        cursor.close()
        connection.close()
        

## Verify email
def verifyEmail(data):
    connection = get_connection()
    cursor = connection.cursor()

    try:
        with open("auth/sql/verify_email/verify_email.sql", "r") as file:
            sql1 = file.read()

        cursor.execute(sql1, (data.token,))
        verification = cursor.fetchone()

        if not verification:
            return {"message": "Invalid verification token", "success": False}

        user_id = verification[0]
        expires_at = verification[1]

        if datetime.utcnow() > expires_at:
            return {"message": "Verification token has expired", "success": False}

        with open("auth/sql/verify_email/user_verified.sql", "r") as file:
            sql2 = file.read()

        cursor.execute(sql2, (user_id,))

        with open("auth/sql/verify_email/delete_token.sql", "r") as file:
            sql3 = file.read()

        cursor.execute(sql3, (data.token,))

        connection.commit()
        return {"message": "Email successfully verified", "success": True}
        
    except Exception as error:
        print(str(error))
        return {"message": str(error), "success": False}
    finally:
        cursor.close()
        connection.close()

def get_current_user(token):
    payload = verify_token(token)

    if not payload:
        return {"message": "Invalid or expired token", "success": False}

    user_id = payload["user_id"]

    connection = get_connection()
    cursor = connection.cursor()

    try: 
        with open("auth/sql/getCurrentUser.sql", "r") as file:
            sql = file.read()
        cursor.execute(
            sql,
           (user_id,)
        )

        user = cursor.fetchone()

        if not user:
            return {"message": "User not found", "success": False}

        return {
            "success": True,
            "user": {
                "id": user[0],
                "email": user[1],
                "username": user[2]
            }
        }

    except Exception as error:
        print(error)
        return {"message": str(error), "success": False}

    
    finally:
        cursor.close()
        connection.close()
        