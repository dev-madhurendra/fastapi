from sqlalchemy import Column, Integer, String, Boolean, Date
import datetime
from db.session import Base


class Todo(Base):
    __tablename__ = 'todo'
    id = Column(Integer,primary_key=True,autoincrement=True)
    title = Column(String(length=500))
    body = Column(String(length=10000))
    isCompleted = Column(Boolean, default=False)
    createdAt = Column(Date, default=datetime.date.today, nullable=True)