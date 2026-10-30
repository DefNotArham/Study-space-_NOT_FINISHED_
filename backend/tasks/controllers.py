from database.database import get_connection
from auth.jwt import verify_token


def createTask(data, authorization):
    if not authorization or not authorization.startswith("Bearer "):
        return {
            "message": "Missing or invalid authorization header", 
            "success": False
        }

    token = authorization.removeprefix("Bearer ").strip()
    payload = verify_token(token)

    if not payload:
        return {
            "message": "Invalid or expired token", "success": False
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

        with open("tasks/sql/createTask.sql", "r") as file:
            sql = file.read()

        cursor.execute(sql, (user_id, data.title, data.description, data.subject, data.priority, data.due_date), )

        row = cursor.fetchone()
        columns = [column[0] for column in cursor.description]
        task = dict(zip(columns, row))

        connection.commit()

        task["due_date"] = (task["due_date"].isoformat() if task["due_date"] else None)
        task["created_at"] = task["created_at"].isoformat()
        
        return {
            "message": "Task created",
            "success": True,
            "task": task,
        }

    except Exception as error:
        print(str(error))
        if connection: 
            connection.rollback()

        return {"message": str(error), "success": False}

    finally:
        if cursor:
            cursor.close()

        if connection: 
            connection.close()


def loadTask(authorization):
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

    user_id = payload["user_id"]

    connection = None
    cursor = None

    try:
        connection = get_connection()
        cursor = connection.cursor()

        with open("tasks/sql/loadTasks.sql", "r") as file:
            sql = file.read()

        cursor.execute(sql, (user_id,))

        rows = cursor.fetchall()
        columns = [column[0] for column in cursor.description]
        tasks = [dict(zip(columns, row)) for row in rows]

        for task in tasks:
            task["due_date"] = (
                task["due_date"].isoformat()
                if task["due_date"]
                else None
            )
            task["created_at"] = task["created_at"].isoformat()

        return {
            "message": "Tasks loaded",
            "success": True,
            "tasks": tasks,
        }

    except Exception as error:
        print(str(error))

        if connection:
            connection.rollback()

        return {"message": str(error), "success": False}

    finally:
        if cursor:
            cursor.close()

        if connection:
            connection.close()


def updateTaskCompleted(data, authorization):
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

        with open("tasks/sql/updateTaskCompleted.sql", "r") as file:
            sql = file.read()

        cursor.execute(sql, (data.completed, data.task_id, user_id))

        row = cursor.fetchone()

        if not row:
            connection.rollback()
            return {
                "message": "Task not found",
                "success": False
            }

        connection.commit()

        return {
            "message": "Task completion updated successfully",
            "success": True
        }

    except Exception as error:
        print(str(error))

        if connection:
            connection.rollback()

        return {
            "message": "Failed to update task completion",
            "success": False
        }

    finally:
        if cursor:
            cursor.close()

        if connection:
            connection.close()

def deleteTask(data, authorization):
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

    user_id = payload["user_id"]

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

        with open("tasks/sql/deleteTask.sql", "r") as file:
            sql = file.read()

        cursor.execute(sql, (data.task_id, user_id))

        row = cursor.fetchone()

        if not row:
            connection.rollback()

            return {
                "message": "Task not found",
                "success": False
            }

        connection.commit()

        return {
            "message": "Task deleted successfully",
            "success": True
        }

    except Exception as error:
        print(str(error))

        if connection:
            connection.rollback()

        return {
            "message": "Failed to delete task", 
            "success": False
        }
    
    finally:
        cursor.close()
        connection.close()

def editTask(data, authorization):
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

        with open("tasks/sql/editTask.sql", "r") as file:
            sql = file.read()

        cursor.execute(sql,(data.title,data.description,data.subject,data.priority,data.due_date,data.task_id,user_id))

        row = cursor.fetchone()

        if not row:
            connection.rollback()
            return {
                "message": "Task not found",
                "success": False
            }

        columns = [column[0] for column in cursor.description]
        task = dict(zip(columns, row))
        
        connection.commit()

        task["due_date"] = (
            task["due_date"].isoformat()
            if task["due_date"]
            else None
        )

        task["created_at"] = task["created_at"].isoformat()

        return {
            "message": "Task updated successfully",
            "success": True,
            "task": task
        }
    
    except Exception as error:
        print(str(error))

        if connection:
            connection.rollback()

        return {
            "message": "Failed to edit task", 
            "success": False
        }
    
    finally:
        if cursor:
            cursor.close()

        if connection:
            connection.close()