from sqlalchemy import Column, Integer, String
from db.session import Base
from sqlalchemy.orm import relationship
from sqlalchemy import ForeignKey

class Blog(Base):
    __tablename__ = 'blogs'
    id = Column(Integer,primary_key=True,autoincrement=True)
    title = Column(String(500), nullable=False)
    body = Column(String(10000))
    user_id = Column(Integer,ForeignKey("user.id"))
    creator = relationship("User", back_populates="blogs") 