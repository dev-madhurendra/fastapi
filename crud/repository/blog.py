from sqlalchemy.orm import Session
import models.blog_model as models
from fastapi import Depends, HTTPException, status
from db.db_connection import get_db
import schemas.blog_schema as schemas



def get_blogs(db: Session = Depends(get_db)):
    blogs = db.query(models.Blog).all()
    return blogs

def get_blog(id: int, db: Session = Depends(get_db)):
    blog = db.query(models.Blog).filter(models.Blog.id == id).first()
    if not blog:
        print('blog not found!')
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=f'Blog with ID {id} not found')
    return blog


def delete_blog(id: int, db: Session = Depends(get_db)):
    blog = db.query(models.Blog).filter(models.Blog.id == id).first()
    if not blog:
        print('blog not found!')
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=f'Blog with ID {id} not found')
    db.delete(blog)
    db.commit()
    return {'detail': f'blog {id} deleted successfully !'}


def update_blog(id: int, request: schemas.Blog ,db: Session=Depends(get_db)):
    blog = db.query(models.Blog).filter(models.Blog.id == id).first()
    if not blog:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=f'Blog with ID {id} not found')
    for field, value in request.dict().items():
        setattr(blog, field, value)

    db.commit()
    return {'message': 'Updated sucessfully !'}