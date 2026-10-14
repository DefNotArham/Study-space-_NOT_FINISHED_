from pydantic import BaseModel, EmailStr, Field
import re


# Register
class RegisterRequest(BaseModel):
    email: EmailStr
    username: str = Field(min_length=1)
    password: str = Field(min_length=8)
    confirmPassword: str = Field(min_length=8)

# Login

class LoginRequest(BaseModel):
    email: EmailStr
    password: str = Field(min_length=1)

# Verify Email

class VerifyEmailRequest(BaseModel):
    token: str


# Forgot password
class ForgotPasswordRequest(BaseModel):
    email: EmailStr

# Reset password
class ResetPasswordRequest(BaseModel):
    token: str = Field(min_length=1)
    new_password: str = Field(min_length=8)