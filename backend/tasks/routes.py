from fastapi import APIRouter

from tasks.controllers import createTask
from tasks.request_schemas import createTask

router = APIRouter()

@router.post("/create-task")
def createTask_route(data: createTask):
    return createTask(data)