"""
    Pydantic is a data validation and settings management library in Python. 
    It is primarily used for data validation and parsing by defining data models 
    with simple Python classes. Pydantic provides a way to declare the expected 
    shape of the data, validate it, and automatically generate corresponding 
    documentation. It is commonly used in web frameworks like FastAPI for request 
    and response validation.
"""
from fastapi import FastAPI, HTTPException 
from enum import Enum
from pydantic import BaseModel, EmailStr, constr

"""
Data Validation:
    Pydantic models are defined using standard Python data types, and Pydantic 
    takes care of validating the data against these types.It supports common data 
    types such as int, float, str, bool, list, dict, etc.
    
Default Values:
    Default values for model attributes can be specified, making them optional.
    
Validation Rules:
    Pydantic provides built-in validation rules for common scenarios like email 
    validation, minimum and maximum values, etc.


"""

# class Status(str, Enum):
#     availabe = 'availabe'
#     idle = 'idle'
#     lunchBreak = 'lunchbreak'

# class User(BaseModel):
#     username: str
#     email: EmailStr
#     age: int
#     name: str = "Unknown"
#     status: Status

app = FastAPI()


class Status(str, Enum):
    available = 'available'
    idle = 'idle'
    lunchBreak = 'lunchbreak'

class User(BaseModel):
    username: str
    email: EmailStr
    age: int
    name: str = "Unknown"
    status: Status

class CreateUser(BaseModel):
    username: constr(min_length=3, max_length=50)
    email: EmailStr
    age: int
    name: str = "Unknown"
    status: Status
    password: constr(min_length=6, max_length=20)

fake_users = [
    {"username": "john_doe", "email": "john@example.com"},
    {"username": "alice", "email": "alice@example.com"}
]


@app.post("/create_user")
async def create_user(user: CreateUser):

    if any(user["username"] == fake_user["username"] or user["email"] == fake_user["email"] for fake_user in fake_users):
        raise HTTPException(status_code=400, detail="Username or email already exists")
    
    return {"message": "User created successfully", "user_data": user.model_dump()}


@app.get('/')    
async def get_users():
    return {'users': fake_users}
