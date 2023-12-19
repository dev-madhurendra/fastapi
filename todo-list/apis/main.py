from fastapi import FastAPI
from router import routes as tood_routes
from db.session import engine
import models.todo as models
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], 
    allow_credentials=True,
    allow_methods=["*"], 
    allow_headers=["*"], 
)

models.Base.metadata.create_all(bind=engine)

app.include_router(tood_routes.router)
