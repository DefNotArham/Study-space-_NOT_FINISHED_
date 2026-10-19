from database.database import get_connection


def createTask(data):
    connection = None
    cursor = None

    try:
        connection = get_connection()
        cursor = connection.cursor()

        with open("tasks/sql/createTask.sql", "r") as file:
            sql = file.read()

        cursor.execute(sql, (data.user_id, data.title, data.description, data.subject, data.priority), )

        task_id = cursor.fetchone()[0]
        connection.commit()

        return {"message": "Task created", "success": True, task_id: task_id }

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