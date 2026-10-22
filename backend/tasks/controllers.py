from database.database import get_connection


def createTask(data):
    connection = None
    cursor = None

    try:
        connection = get_connection()
        cursor = connection.cursor()

        with open("tasks/sql/createTask.sql", "r") as file:
            sql = file.read()

        cursor.execute(sql, (data.user_id, data.title, data.description, data.subject, data.priority, data.due_date), )

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