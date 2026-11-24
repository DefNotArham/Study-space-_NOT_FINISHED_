from fastapi import APIRouter, Header, HTTPException
from .request_schemas import CreateRoomRequest
from .controllers import createRoom, loadRooms

router = APIRouter()

@router.post("/create-room")
def create_room_route(
    data: CreateRoomRequest,
    authorization: str | None = Header(default=None)
):
    return createRoom(data, authorization)

@router.get("/load-rooms")
def load_rooms(authorization: str | None = Header(default=None)):
    return loadRooms(authorization)