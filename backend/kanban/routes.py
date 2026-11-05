from fastapi import APIRouter
from request_schemas import UpdateStatusRequest
from controllers import updateStatus

router = APIRouter()

@router.post("/update-status")
def updateStatusRoute(data: UpdateStatusRequest):
    return updateStatus(data)