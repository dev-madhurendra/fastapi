from fastapi import FastAPI
from typing import Optional
from utils import fake_items_db

app = FastAPI()


@app.get("/items/")
async def read_item(sortBy: Optional[str],sortItem: Optional[str]):
    sorted_items = fake_items_db
    if sortBy:
        if sortItem:
            sorted_items = sorted(sorted_items, key=lambda item: item[sortItem], reverse=sortBy == "desc")
        else:
            sorted_items = sorted(sorted_items, key=lambda item: item["price"], reverse=sortBy == "desc")
    return {'items': sorted_items}
