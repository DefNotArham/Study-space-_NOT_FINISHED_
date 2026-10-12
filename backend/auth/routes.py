from fastapi import APIRouter, Header

from .schemas import RegisterRequest, LoginRequest, VerifyEmailRequest, ForgotPasswordRequest, ResetPasswordRequest
from .controllers import register, login, verifyEmail, get_current_user, ForgotPassword, ResetPassword

router = APIRouter()

### Register

@router.post("/register")
def register_route(data: RegisterRequest):
    return register(data)

@router.post("/login")
def login_route(data: LoginRequest):
    return login(data)

@router.post("/verify-email")
def verifyEmail_route(data: VerifyEmailRequest):
    return verifyEmail(data)

@router.get("/me")
def getCurrentUser_route(authorization: str | None = Header(default=None)):
    if not authorization or not authorization.startswith("Bearer "):
        return {
            "message": "Missing or invalid authorization header",
            "success": False
        }

    token = authorization.removeprefix("Bearer ").strip()
    return get_current_user(token)

@router.post("/forgot-password")
def forgotPassword_route(data: ForgotPasswordRequest):
    return ForgotPassword(data)

@router.post("/reset-password")
def resetPassword_route(data: ResetPasswordRequest):
    return ResetPassword(data)