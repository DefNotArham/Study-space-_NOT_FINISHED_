from pydantic import BaseModel, EmailStr, Field, field_validator, model_validator
import re

def validatePassword(password: str) -> str:
    if len(password) < 8:
        raise ValueError("Password must be at least 8 characters long")

    if not re.search(r"[A-Z]", password):
        raise ValueError("Password must contain at least one uppercase letter")

    if not re.search(r"[a-z]", password):
        raise ValueError("Password must contain at least one lowercase letter")

    if not re.search(r"\d", password):
        raise ValueError("Password must contain at least one number")

    return password


# Register
class RegisterRequest(BaseModel):
    email: EmailStr
    username: str = Field(min_length=1)
    password: str = Field(min_length=8)
    confirm_password: str = Field(min_length=8)

    @field_validator("password", "confirm_password")
    @classmethod
    def check_password(cls, value: str) -> str:
        return validatePassword(value)

    @model_validator(mode="after")
    def check_match_passwords(self):
        if self.password != self.confirm_password:
            raise ValueError("Passwords do not match")
        return self

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
    confirm_password: str = Field(min_length=8)

    @field_validator("new_password", "confirm_password")
    @classmethod
    def check_password(cls, value: str) -> str:
        return validatePassword(value)

    @model_validator(mode="after")
    def check_match_passwords(self):
        if self.new_password != self.confirm_password:
            raise ValueError("Passwords do not match")
        return self
