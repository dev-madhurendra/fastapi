from datetime import date
from pydantic import BaseModel

  
class CommonTodo(BaseModel):
    title: str
    body: str
    isCompleted: bool
    
class ResponseTodo(CommonTodo):
    id: int
    createdAt: date
    class Config():
        from_attributes = True

class RequestTodo(BaseModel):
    title: str
    body: str

    class Config():
        from_attributes = True
    