from pydantic import BaseModel
from typing import Literal
from datetime import date


class createTaskRequest(BaseModel):
    title: str
    description: str | None = None
    subject: str
    priority: Literal["low", "medium", "high"]
    due_date: date | None = None
