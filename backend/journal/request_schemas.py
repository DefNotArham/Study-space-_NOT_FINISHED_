from pydantic import BaseModel
from typing import Literal

class CreateJournalRequest(BaseModel):
    title: str
    content: str