from auth.routes import router as authRouter
from fastapi import FastAPI

app = FastAPI()

app.include_router(authRouter, prefix="/auth")
