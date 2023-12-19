from pydantic import BaseModel
from typing import List
  
class Blog(BaseModel):
    title: str
    body: str
        
class ShowUserBlog(BaseModel):
    name: str
    email: str
    
class ResponseBlog(Blog):
    id: int
    creator: ShowUserBlog
    
    class Config():
        from_attributes = True
    
    