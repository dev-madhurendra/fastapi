import enum
from typing import List
from pydantic import BaseModel, EmailStr, constr, validator,Field

# Define a Pydantic model (schema)
class Item(BaseModel):
    name: str
    description: str = None
    price: float
    tax: float = None
    tags: list = []
    
# Enum for user roles
class UserRole(str, enum.Enum):
    ADMIN = "admin"
    USER = "user"
    GUEST = "guest"


# Sub-model for address
class Address(BaseModel):
    street: str
    city: str
    zip_code: str


# Main model with validation and dependencies
class User(BaseModel):
    name: constr(min_length=3, max_length=50, regex="^[a-zA-Z0-9_-]+$")
    username: str = Field(...,min_length=3, max_length=50, pattern="^[a-zA-Z0-9_-]+$")
    email: EmailStr
    age: int = Field(...,gt=0)
    role: UserRole = UserRole.USER
    addresses: List[Address] = []
    is_active: bool = True

    # Custom validation using a Pydantic validator
    @validator("age")
    def check_age(cls, value):
        if value < 18:
            raise ValueError("Age must be 18 or older")
        return value
    