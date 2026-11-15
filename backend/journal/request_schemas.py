from pydantic import BaseModel
from typing import Literal

class CreateJournalRequest(BaseModel):
    journal: str