from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from db.db_connection import get_db
import schemas.todo as schemas
import repository.todo as todo_repo

router = APIRouter(tags=["todos"],prefix="/todos")


@router.post("/", response_model=schemas.ResponseTodo)
def create_todo(request: schemas.RequestTodo, db: Session = Depends(get_db)):
    return todo_repo.create(request, db)

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
