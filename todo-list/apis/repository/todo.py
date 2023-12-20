from fastapi import Depends, HTTPException, status
from sqlalchemy.orm import Session
from db.db_connection import get_db
import models.user as user_model
import schemas.todo as schemas
import models.todo as models
from exceptions.exception import TodoNotFoundException


def create(userId: int, request: schemas.RequestTodo, db: Session = Depends(get_db)):
    is_user_exist = db.query(user_model.User).filter(user_model.User.id == userId).first()
    if not is_user_exist:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=f"User does not exist !")
    todo = models.Todo(**request.model_dump(), user_id=userId)
    db.add(todo)
    db.commit()
    db.refresh(todo)
    return todo


def get_all(db: Session = Depends(get_db)):
    todos = db.query(models.Todo).all()
    return todos


def get(id: int, db: Session = Depends(get_db)):
    todo = db.query(models.Todo).filter(models.Todo.id == id).first()
    if not todo:
        raise TodoNotFoundException(todo_id=id)
    return todo


def update(id: int, request: schemas.CommonTodo, db: Session = Depends(get_db)):
    todo = db.query(models.Todo).filter(models.Todo.id == id).first()
    if not todo:
        raise TodoNotFoundException(todo_id=id)

    update_data = request.model_dump(exclude_unset=True)
    for field, value in update_data.items():
        setattr(todo, field, value)

    db.commit()
    return todo


def delete(id: int, db: Session = Depends(get_db)):
    todo = db.query(models.Todo).filter(models.Todo.id == id).first()
    if not todo:
        raise TodoNotFoundException(todo_id=id)
    
    db.delete(todo)
    db.commit()
    return {'detail': f'Todo {id} deleted successfully!'}