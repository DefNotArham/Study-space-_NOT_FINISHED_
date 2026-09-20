from fastapi import APIRouter
from .schemas import RegisterRequest

from .controllers import register

router = APIRouter()

### Register

@router.post("/register")
def register_route(data: RegisterRequest):
    register(data)