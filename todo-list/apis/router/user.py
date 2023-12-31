from fastapi import APIRouter, status
from typing import List
from middleware.Oauth2 import get_current_user
import schemas.user as schemas
import schemas.todo as blog_schemas
from repository.user import *
from fastapi import Depends
from sqlalchemy.orm import Session
from db.db_connection import get_db

router = APIRouter(
    prefix="/users",
    tags=["users"]
)

@router.post('/',response_model=schemas.ResponseUser, status_code=status.HTTP_201_CREATED)
def create(request: schemas.RequestUser, db: Session = Depends(get_db)):
    return add_user(request, db)

@router.get('/', response_model=List[schemas.ShowUser], status_code=status.HTTP_200_OK)
def reads(db: Session = Depends(get_db), get_current_user: schemas.ShowUser = Depends(get_current_user)):
    return get_users(db)


@router.get('/{id}', response_model=schemas.ShowUser, status_code=status.HTTP_200_OK)
def read(id: int, db: Session = Depends(get_db)):
    return get_user(id,db)

@router.get("/current")
def get_current_user(token: str):
    return get_current_user(token)

# @router.post('/{user_id}/blogs', response_model=schemas.Blog, status_code=status.HTTP_201_CREATED, tags=['blogs'])
# def create_blog_user(user_id: int,request: schemas.Blog, db: Session = Depends(get_db), get_current_user: blog_schemas.ResponseBlog = Depends(get_current_user)):
#     return create_blog(user_id, request, db)