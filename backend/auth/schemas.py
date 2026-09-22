from pydantic import BaseModel


# Register
class RegisterRequest(BaseModel):
    email: str
    username: str
    password: str
    confirmPassword: str