from db.session import SessionLocal
import logging

def get_db():
    db = SessionLocal()
    try:
        yield db
        logging.info(">>> Database connected successfully !")
    finally:
        db.close()
        logging.info(">>> Database closed !")