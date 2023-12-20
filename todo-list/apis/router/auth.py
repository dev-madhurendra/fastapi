from datetime import timedelta
from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm
import schemas.login as schemas
from models.user import User
from sqlalchemy.orm import Session
from db.db_connection import get_db
from utils.function import create_access_token
from utils.hashing import Hash
from core.config import access_token_time

router = APIRouter(
    tags=['Authentication']
)

@router.post('/login')
def login(request: schemas.Login, db: Session = Depends(get_db)):
    is_user_exist = db.query(User).filter(User.email == request.username).first()
    if not is_user_exist:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
                            detail=f"User does not exist !")
        
    if not Hash.verify(is_user_exist.password,request.password):
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
                            detail=f"Incorrect password !")
    
    
    access_token_expires = timedelta(minutes=int(access_token_time))
    access_token = create_access_token(
        data={"sub": is_user_exist.email}, expires_delta=access_token_expires
    )
    return {"access_token": access_token, "token_type": "bearer", "user_id": is_user_exist.id}