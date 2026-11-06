from database.database import get_connection
from auth.jwt import verify_token

def updateStatus(data, authorization):
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

        with open("kanban/sql/updateStatus.sql", "r") as file:
            sql = file.read()

        cursor.execute(
            sql,
            (data.status, data.status, data.task_id, user_id)
        )

        updated_task = cursor.fetchone()
        connection.commit()

        if not updated_task:
            return {
                "message": "Task not found",
                "success": False
            }

        return {
            "message": "Task status updated",
            "success": True
        }

    except Exception as error:
        print(str(error))

        if connection:
            connection.rollback()

        return {
            "message": str(error),
            "success": False
        }

    finally:
        if cursor:
            cursor.close()

        if connection:
            connection.close()