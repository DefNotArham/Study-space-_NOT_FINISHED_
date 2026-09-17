from pydantic import BaseModel

### Register

def RegisterRequest(BaseModel):
    email: str
    username: str
    password: str
    confirmPassword: str
