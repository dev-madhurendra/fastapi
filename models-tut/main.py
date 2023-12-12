from typing import Any, List, Union

from fastapi import FastAPI
from pydantic import BaseModel

app = FastAPI()

class Item(BaseModel):
    name: str
    description: Union[str, None] = None
    price: float
    tax: Union[float, None] = None
    tags: List[str] = []
    # name: str
    # description: Optional[str] = None
    # price: float
    # tax: Optional[float] = None
    # tags: List[str] = []

fake_db = []

@app.post("/items/", response_model=Item)
async def create_item(item: Item) -> Any:
    # Simulate storing the item in a database
    item_data = item.dict()
    fake_db.append(item_data)
    return item

@app.get("/items/", response_model=List[Item])
async def read_items() -> Any:
    # Simulate getting items from a database
    return fake_db
