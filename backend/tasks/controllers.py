from database.database import get_connection


def createTask(data):
    connection = get_connection()
    cursor = connection.cursor()

    try:
        
        