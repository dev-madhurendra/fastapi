from fastapi import FastAPI
from utils import fake_items_db

app = FastAPI()


# @app.get("/items/")
# def read_item(skip, limit):
#     return fake_items_db[skip : skip + limit]

# @app.get("/items/")
# def read_item(skip = 0, limit = 2):
#     return fake_items_db[skip : skip + limit]

@app.get("/items/")
async def read_item(skip: int = 0, limit: int = len(fake_items_db)):
    return fake_items_db[skip : skip + limit]


@app.get("/items/{item_id}")
async def read_item(item_id: int, q: str | None = None, short: bool = False):
    item = fake_items_db[item_id - 1]
    if q:
        item.update({"q": q})
    elif short:
        item.update(
            {"description": "This is an amazing item that has a short description"}
        )
    elif not q:
        if "q" in item.keys():
            item.pop("q")
    elif not short:
        if "description" in item.keys():
            item.pop("description")
    
    return item

    