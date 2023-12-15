from sqlalchemy import Column, Integer, String
from db.session import Base


class User(Base):
    __tablename__ = 'user'
    id = Column(Integer,primary_key=True,autoincrement=True)
    name = Column(String(length=255), nullable=False)
    email = Column(String(length = 255))
    password = Column(String(length=500))