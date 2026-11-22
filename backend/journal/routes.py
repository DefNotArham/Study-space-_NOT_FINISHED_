from fastapi import APIRouter, Header
from .controllers import createJournal
from .request_schemas import CreateJournalRequest
from .controllers import loadJournals

router = APIRouter()

@router.post("/create-journal")
def createJournal_route(data: CreateJournalRequest, authorization: str | None = Header(default=None)):
    return createJournal(data, authorization)

@router.get("load-journals")
def loadJournals_route(authorization: str | None = Header(default=None)):
    return loadJournals(authorization)