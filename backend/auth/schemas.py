from pydantic import BaseModel, EmailStr


# Register
class RegisterRequest(BaseModel):
    email: EmailStr
    username: str
    password: str
    confirmPassword: str