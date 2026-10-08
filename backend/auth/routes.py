from fastapi import APIRouter

from .schemas import RegisterRequest, LoginRequest, VerifyEmailRequest, GetCurrentUserRequest
from .controllers import register, login, verifyEmail, get_current_user

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
def getCurrentUser_route(data: GetCurrentUserRequest):
    return get_current_user(data.token)