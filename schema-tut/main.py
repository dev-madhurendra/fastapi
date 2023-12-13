from fastapi import FastAPI
from schemas.schema import Item

app = FastAPI()

# Use the schema in a FastAPI route
@app.post("/items/")
async def create_item(item: Item):
    # The 'item' parameter is automatically validated against the Item schema
    return {"item_name": item.name, "item_price": item.price}
