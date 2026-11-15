from database.database import get_connection
from auth.jwt import verify_token

def createJournal(data, authorization):
    if not authorization or not authorization.startswith("Bearer "):
        return {
            "message": "Missing or invalid authorization header",
            "success": False
        }

    token = authorization.removeprefix("Bearer ").strip()
    payload = verify_token(token)

    if not payload:
        return {
            "message": "Invalid or expired token",
            "success": False
        }

    user_id = payload.get("user_id")

    if user_id is None:
        return {
            "message": "Invalid token payload",
            "success": False
        }

    connection = None
    cursor = None

    try:
        connection = get_connection()
        cursor = connection.cursor()

        with open("journal/sql/createJournal.sql", "r") as file:
            sql = file.read()

        cursor.execute(sql, (user_id, data.title, data.content))

        row = cursor.fetchone()
        columns = [column[0] for column in cursor.description]
        journal = dict(zip(columns, row))

        connection.commit()

        journal["created_at"] = journal["created_at"].isoformat()

        return {
            "message": "Journal entry created",
            "success": True,
            "journal": journal
        }

    except Exception as error:
        print(error)

        if connection:
            connection.rollback()

        return {
            "message": "Failed to create journal entry",
            "success": False
        }

    finally:
        if cursor:
            cursor.close()
        if connection:
            connection.close()
        