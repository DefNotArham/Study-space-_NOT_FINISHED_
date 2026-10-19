from database.database import get_connection


def createTask(data):
    connection = None
    cursor = None

    try:
        connection = get_connection()
        cursor = connection.cursor()