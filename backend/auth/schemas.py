from pydantic import BaseModel, EmailStr, Field


# Register
class RegisterRequest(BaseModel):
    email: EmailStr
    username: str = Field(min_length=1)
    password: str = Field(min_length=1)
    confirmPassword: str = Field(min_length=1)

# Login

class LoginRequest(BaseModel):
    email: EmailStr
    password: str = Field(min_length=1)

# Verify Email

class VerifyEmailRequest(BaseModel):
    token: str

# Get Current User
class GetCurrentUserRequest(BaseModel):
    token: str