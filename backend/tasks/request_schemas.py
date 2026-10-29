from pydantic import BaseModel
from typing import Literal
from datetime import date


class createTaskRequest(BaseModel):
    title: str
    description: str | None = None
    subject: str
    priority: Literal["low", "medium", "high"]
    due_date: date | None = None

class updateTaskCompletedRequest(BaseModel):
    task_id: int
    completed: bool

class deleteTaskRequest(BaseModel):
    task_id: int


class editTaskRequest(BaseModel):
    task_id: int
    title: str
    description: str | None
    subject: str
    priority: Literal["low", "medium", "high"]
    due_date: date | None