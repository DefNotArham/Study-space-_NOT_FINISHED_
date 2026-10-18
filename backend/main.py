from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from auth.routes import router as authRouter
from tasks.routes import router as tasksRouter

from contextlib import asynccontextmanager
from database.database import initialize_database

@asynccontextmanager
async def lifespan(app: FastAPI):
    initialize_database()
    yield

app = FastAPI(lifespan=lifespan)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(authRouter, prefix="/auth")
app.include_router(tasksRouter, prefix="/tasks")