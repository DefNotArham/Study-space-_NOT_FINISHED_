from pydantic import BaseModel


class createTaskRequest(BaseModel):
    title: str
    description: str
    subject: str
    priority: Literal["low", "medium", "high"]
    
    