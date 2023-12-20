from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from middleware.Oauth2 import get_current_user
from db.db_connection import get_db
import schemas.todo as schemas
import schemas.user as user_schema
import repository.todo as todo_repo

router = APIRouter(tags=["todos"],prefix="/todos")


@router.post("/user/{userId}", response_model=schemas.ResponseTodo)
def create_todo(userId: int, request: schemas.RequestTodo, db: Session = Depends(get_db),get_current_user: user_schema.ShowUser = Depends(get_current_user)):
    return todo_repo.create(userId, request, db)

@router.get("/", response_model=list[schemas.ResponseTodo])
def get_all_todos(db: Session = Depends(get_db)):
    return todo_repo.get_all(db)

@router.get("/{id}", response_model=schemas.ResponseTodo)
def get_todo_by_id(id: int, db: Session = Depends(get_db)):
    return todo_repo.get(id, db)

@router.put("/{id}", response_model=schemas.ResponseTodo)
def update_todo(id: int, request: schemas.CommonTodo, db: Session = Depends(get_db)):
    return todo_repo.update(id, request, db)

@router.delete("/{id}", response_model=dict)
def delete_todo(id: int, db: Session = Depends(get_db)):
    return todo_repo.delete(id, db)
