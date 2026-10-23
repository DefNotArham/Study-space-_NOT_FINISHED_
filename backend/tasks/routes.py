from fastapi import APIRouter
from .controllers import createTask, loadTask
from .request_schemas import createTaskRequest, loadTaskRequest

router = APIRouter()

@router.post("/create-task")
def createTask_route(data: createTaskRequest):
    return createTask(data)

@router.get("/load-task")
def loadTask_route(data: loadTaskRequest):
    return loadTask(data)