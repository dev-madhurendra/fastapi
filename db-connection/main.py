from db.session import SessionLocal, engine
from fastapi import Depends, FastAPI, HTTPException, status, Response
from sqlalchemy.orm import Session
from typing import List
import models.user_model as models
import schemas.users as schemas

app = FastAPI()


# creating all the models in the database
models.Base.metadata.create_all(bind = engine)

def get_db():
    db = SessionLocal()
    try:
        yield db
        print("Database connected successfully !")
    finally:
        db.close()
        
@app.post('/',response_model=schemas.User, status_code=status.HTTP_201_CREATED)
def addUser(request: schemas.User, db: Session = Depends(get_db)):
    new_user = models.User(name = request.name, email = request.email, password = request.password)
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    return new_user
    # new_user = db.query(models.User).
    

