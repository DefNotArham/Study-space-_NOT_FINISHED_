from fastapi import APIRouter, Header
from .request_schemas import UpdateStatusRequest
from .controllers import updateStatus

router = APIRouter()

@router.post("/update-status")
def updateStatusRoute(
    data: UpdateStatusRequest,
    authorization: str | None = Header(default=None)
):
    return updateStatus(data, authorization)