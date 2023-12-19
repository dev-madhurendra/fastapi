from fastapi import APIRouter, status
from typing import List
import schemas.blog_schema as schemas
from models.user_model import User
from middleware.Oauth2 import get_current_user
from repository.blog import *

router = APIRouter(
    prefix="/blogs",
    tags=["blogs"]
)

router.post('',response_model=schemas.ResponseBlog)
def create_blog(user_id: int, request: schemas.Blog,db: Session = Depends(get_db), get_current_user: schemas.ShowUserBlog = Depends(get_current_user)):
    is_user_exist = db.query(User).filter(User.id == user_id).first()
    if not is_user_exist:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=f"User does not exist !")
    new_blog = models.Blog(title = request.title,body = request.body, user_id=user_id)
    db.add(new_blog)
    db.commit()
    db.refresh(new_blog)
    return new_blog

@router.get('',response_model=List[schemas.ResponseBlog])
def all(db: Session = Depends(get_db), get_current_user: schemas.ShowUserBlog = Depends(get_current_user)):
    return get_blogs(db)

@router.get('/{id}',response_model=schemas.ResponseBlog, status_code=status.HTTP_200_OK)
def get(id: int, db: Session = Depends(get_db), get_current_user: schemas.ShowUserBlog = Depends(get_current_user)):
    return get_blog(id,db)

@router.delete('/{id}', status_code=status.HTTP_204_NO_CONTENT )
def delete(id: int, db: Session = Depends(get_db), get_current_user: schemas.ShowUserBlog = Depends(get_current_user)):
    return delete_blog(id, db)


@router.put('/{id}', status_code=status.HTTP_202_ACCEPTED)
def update(id: int,request: schemas.Blog, db: Session = Depends(get_db), get_current_user: schemas.ShowUserBlog = Depends(get_current_user)):
    return update_blog(id,request, db)