from fastapi import APIRouter

from .schemas import RegisterRequest, LoginRequest
from .controllers import register, login

router = APIRouter()

### Register

@router.post("/register")
def register_route(data: RegisterRequest):
    return register(data)

@router.post("/login")
def login_route(data: LoginRequest):
    return login(data)