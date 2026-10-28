from fastapi import APIRouter, Header
from .controllers import createTask, loadTask, updateTaskCompleted, deleteTask
from .request_schemas import createTaskRequest, updateTaskCompletedRequest, deleteTaskRequest

router = APIRouter()

@router.post("/create-task")
def createTask_route(data: createTaskRequest, authorization: str | None = Header(default=None)):
    return createTask(data, authorization)

@router.get("/load-task")
def loadTask_route(authorization: str | None = Header(default=None)):
    return loadTask(authorization)

@router.patch("/update-task-completed")
def updateTaskCompleted_route(data: updateTaskCompletedRequest, authorization: str | None = Header(default=None)):
    return updateTaskCompleted(data, authorization)

@router.delete("/delete-task")
def deleteTask_route(data: deleteTaskRequest, authorization: str | None = Header(default=None)):
    return deleteTask(data, authorization)