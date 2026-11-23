from fastapi import APIRouter, Header, HTTPException
from .request_schemas import CreateRoomRequest
from .controllers import createRoom

router = APIRouter()

@router.post("/create-room")
def create_room_route(
    data: CreateRoomRequest,
    authorization: str | None = Header(default=None)
):
    return createRoom(data, authorization)