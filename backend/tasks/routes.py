from fastapi import APIRouter

from .controllers import createTask
from .request_schemas import createTaskRequest

router = APIRouter()

@router.post("/create-task")
def createTask_route(data: createTaskRequest):
    return createTask(data)