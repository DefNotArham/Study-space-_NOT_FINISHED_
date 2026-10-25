from fastapi import APIRouter, Header
from .controllers import createTask, loadTask
from .request_schemas import createTaskRequest

router = APIRouter()

@router.post("/create-task")
def createTask_route(data: createTaskRequest):
    return createTask(data)

@router.get("/load-task")
def loadTask_route(authorization: str | None = Header(default=None)):
    return loadTask(authorization)