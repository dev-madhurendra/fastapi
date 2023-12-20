from pydantic import BaseModel
from typing import List
from schemas.todo import ResponseTodo


class CommonUser(BaseModel):
    name: str
    email: str
    password: str
    
class RequestUser(CommonUser):
    pass


class ResponseUser(CommonUser):
    id: int

    class Config:
        from_attributes = True

class ShowUser(BaseModel):
    id: int
    name: str
    email: str
    todo: List[ResponseTodo]
    