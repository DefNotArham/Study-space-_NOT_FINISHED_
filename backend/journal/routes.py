from fastapi import APIRouter, Header
from .controllers import createJournal
from .request_schemas import CreateJournalRequest

router = APIRouter()

@router.post("/create-journal")
def createJournal_route(data: CreateJournalRequest, authorization: str | None = Header(default=None)):
    return createJournal(data, authorization)