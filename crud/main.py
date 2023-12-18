from fastapi import FastAPI
from routers import user,blog,auth
from utils.function import create_all_engine_models

app = FastAPI()


# Define the module where your models are located
create_all_engine_models("models")
   

app.include_router(user.router)
app.include_router(blog.router)
app.include_router(auth.router)