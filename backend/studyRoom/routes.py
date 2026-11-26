from fastapi import APIRouter, Header, HTTPException
from .request_schemas import CreateRoomRequest, DeleteRoomRequest, JoinRoomRequest
from .controllers import createRoom, loadRooms, deleteRoom, joinRoom

router = APIRouter()

@router.post("/create-room")
def create_room_route(
    data: CreateRoomRequest,
    authorization: str | None = Header(default=None)
):
    return createRoom(data, authorization)

@router.get("/load-rooms")
def load_rooms_route(authorization: str | None = Header(default=None)):
    return loadRooms(authorization)

@router.delete("/delete-room")
def delete_room_route(data: DeleteRoomRequest, authorization: str | None = Header(default=None)):
    return deleteRoom(data, authorization)

@router.patch("/join-room")
def join_room_route(data: JoinRoomRequest, authorization: str | None = Header(default=None)):
    return joinRoom(data, authorization)