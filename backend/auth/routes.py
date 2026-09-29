from fastapi import APIRouter

from .schemas import RegisterRequest, LoginRequest, VerifyEmailRequest
from .controllers import register, login, verifyEmail

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