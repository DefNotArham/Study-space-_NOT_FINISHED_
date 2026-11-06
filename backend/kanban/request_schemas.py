from pydantic import BaseModel
from typing import Literal

class UpdateStatusRequest(BaseModel):
    task_id: int
    status: Literal["todo", "in_progress", "completed"]