from auth.jwt import verify_token
from database.database import get_connection

import secrets
import string


def generate_invite_code(length=8):
    characters = string.ascii_uppercase + string.digits
    return ''.join(secrets.choice(characters) for _ in range(length))

def createRoom(data, authorization):
    if not authorization or not authorization.startswith("Bearer "):
        return {
            "message":  "Missing or invalid header",
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

    if not user_id:
        return {
            "message": "Invalid payload token",
            "success": False
        }

    connection = None
    cursor = None

    try:
        connection = get_connection()
        cursor = connection.cursor()

        invite_code = generate_invite_code()

        with open("studyRoom/sql/createRoom/createRoom.sql", "r") as file:
            sql1 = file.read()

        cursor.execute(sql1, (user_id, data.name, data.description, invite_code))

        room = cursor.fetchone()
        room_id = room[0]

        with open("studyRoom/sql/createRoom/addMember.sql", "r") as file:
            sql2 = file.read()

        cursor.execute(sql2, (room_id, user_id))

        connection.commit()


        return {
            "message": "Room created successfully",
            "success": True,
            "room": {
                "id": room[0],
                "host_id": room[1],
                "name": room[2],
                "description": room[3],
                "invite_code": room[4],
                "created_at": room[5].isoformat() if room[5] else None
            }
        }

    except Exception as error:
        print(error)

        if connection:
            connection.rollback()

        return {
            "message": "Failed to create room",
            "success": False
        }
    
    finally:
        if cursor:
            cursor.close()
        if connection:
            connection.close()


def loadRooms(authorization):
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

    if not user_id:
        return {
            "message": "Invalid payload token",
            "success": False
        }

    connection = None
    cursor = None

    try:
        connection = get_connection()
        cursor = connection.cursor()

        with open("studyRoom/sql/loadRooms.sql", "r") as file:
            sql = file.read()

        cursor.execute(sql, (user_id,) )

        rooms = cursor.fetchall()

        rooms_list = []

        for room in rooms:
            rooms_list.append({
                "id": room[0],
                "host_id": room[1],
                "name": room[2],
                "description": room[3],
                "invite_code": room[4],
                "created_at": room[5].isoformat() if room[5] else None
            })

        return {
            "message": "Rooms loaded successfully",
            "success": True,
            "rooms": rooms_list
        }

    except Exception as error: 
        print(error)

        return {
            "message": "Failed to load rooms",
            "success": False
        }

    finally:
        if cursor:
            cursor.close()

        if connection:
            connection.close()
