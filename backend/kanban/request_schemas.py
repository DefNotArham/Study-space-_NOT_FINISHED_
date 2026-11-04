from pydantic import BaseModel
from typing import Literal

class UpdateStatusRequest(BaseModel):
    taskId: int
    status: Literal["todo", "in_progress", "completed"]

    