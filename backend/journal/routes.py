from fastapi import APIRouter
from .controllers import createJournal
from .request_schemas import CreateJournalRequest

router = APIRouter()

@router.post("/create-journal")
def ceateJournal_route(data: CreateJournalRequest):
    return createJournal(data)