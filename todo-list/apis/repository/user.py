from sqlalchemy.orm import Session
import models.user as models
from db.db_connection import get_db
from fastapi.responses import JSONResponse
from fastapi import Depends,status, HTTPException
import schemas.user as schemas
from utils.hashing import Hash


def add_user(request: schemas.RequestUser, db: Session = Depends(get_db)):
    hashedPassword = Hash.bcrypt(request.password)
    new_user = models.User(name = request.name, email = request.email, password = hashedPassword)
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    return new_user


def get_users(db: Session = Depends(get_db)):
    users =  db.query(models.User).all()
    if len(users) == 0:
        return JSONResponse({
                "message": "No users available !",
                "status": status.HTTP_404_NOT_FOUND
            })
    return users;


def get_user(id: int, db: Session = Depends(get_db)):
    user =  db.query(models.User).filter(models.User.id == id).first()
    if not user:
        return JSONResponse({
            "message": f"No user available with id {id} !",
            "status": status.HTTP_404_NOT_FOUND
        })
    return user;
    