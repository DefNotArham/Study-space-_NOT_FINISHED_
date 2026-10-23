from pydantic import BaseModel
from typing import Literal
from datetime import date


class createTaskRequest(BaseModel):
    user_id: str
    title: str
    description: str
    subject: str
    priority: Literal["low", "medium", "high"]
    due_date: date | None = None

class loadTaskRequest(BaseModel):
    user_id: str