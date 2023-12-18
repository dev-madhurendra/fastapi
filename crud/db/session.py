
from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from core.config import database_url

SQLALCHEMY_DATABASE_URL = database_url
# SQLALCHEMY_DATABASE_URL = "postgresql://user:password@postgresserver/db"


# create an SQLAlchemy engine
engine = create_engine(SQLALCHEMY_DATABASE_URL)

# creates a new Session class.
# A Session represents a "workspace" for the ORM providing a set of methods to interact with the database. 

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# allows you to define database models as Python classes.
Base = declarative_base()