from fastapi import APIRouter, status
from typing import List
from middleware.Oauth2 import get_current_user
from routers.blog import create_blog
import schemas.user_schema as schemas
import schemas.blog_schema as blog_schemas
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
def read(id: int, db: Session = Depends(get_db), get_current_user: schemas.ShowUser = Depends(get_current_user)):
    return get_user(id,db)

@router.post('/{user_id}/blogs', response_model=schemas.Blog, status_code=status.HTTP_201_CREATED, tags=['blogs'])
def create_blog_user(user_id: int,request: schemas.Blog, db: Session = Depends(get_db), get_current_user: blog_schemas.ResponseBlog = Depends(get_current_user)):
    return create_blog(user_id, request, db)
