from db.session import SessionLocal, engine
from fastapi import Depends, FastAPI, status
from sqlalchemy.orm import Session
from typing import List
import models.user_model as models
import schemas.users as schemas
from passlib.context import CryptContext

app = FastAPI()


# creating all the models in the database
models.Base.metadata.create_all(bind = engine)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
        
        
pwd_cxt = CryptContext(schemes=["bcrypt"], deprecated="auto")       

@app.post('/users',response_model=schemas.User, status_code=status.HTTP_201_CREATED)
def addUser(request: schemas.User, db: Session = Depends(get_db)):
    hashedPassword = pwd_cxt.hash(request.password)
    new_user = models.User(name = request.name, email = request.email, password = hashedPassword)
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    return new_user
    # new_user = db.query(models.User).
    
@app.get('/user', response_model=List[schemas.User], status_code=status.HTTP_200_OK)
def getUsers(db: Session = Depends(get_db)):
    return db.query(models.User).all()
    

