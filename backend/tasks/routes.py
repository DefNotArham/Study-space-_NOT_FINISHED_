from fastapi import APIRouter

from controllers import createTask
from request_schemas import createTask

router = APIRouter()

@router.post("/create-task")
def createTask_route(data: createTask):
    return createTask(data)
