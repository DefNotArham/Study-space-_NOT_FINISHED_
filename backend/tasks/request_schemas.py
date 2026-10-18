from pydantic import BaseModel


class createTask(BaseModel):
    name: str
    