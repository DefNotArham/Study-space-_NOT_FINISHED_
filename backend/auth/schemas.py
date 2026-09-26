from pydantic import BaseModel, EmailStr, Field


# Register
class RegisterRequest(BaseModel):
    email: EmailStr
    username: str = Field(min_length=1)
    password: str = Field(min_length=1)
    confirmPassword: str = Field(min_length=1)

class LoginRequest(BaseModel):
    email: EmailStr
    password: str = Field(min_length=1)