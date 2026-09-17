from fastapi import APIRouter
from .controllers import register

router = APIRouter()

@router.post("/register")
def register_route():
    register()