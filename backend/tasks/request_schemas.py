from pydantic import BaseModel
from typing import Literal


class createTaskRequest(BaseModel):
    title: str
    description: str
    subject: str
    priority: Literal["low", "medium", "high"]
    
    