from fastapi import FastAPI
import uvicorn
from utils import fake_items_db
from pydantic import BaseModel

app = FastAPI()


class Item(BaseModel):
    item_name: str
    price: float
    quantity: int
    


@app.post("/items/")
async def create_item(item: Item):
    fake_items_db.append(item)
    return {'items': fake_items_db}


# if you want to run the server at localhost:8080 then
# run using this command : python3 file_name.py
if __name__ == '__main__':
    uvicorn.run(app, host="127.0.0.1", port=8080)
    