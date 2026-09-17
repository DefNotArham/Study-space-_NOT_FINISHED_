from pydantic import BaseModel


def RegisterRequest(BaseModel):
    email: str
    username: str
    password: str
    confirmPassword: str
