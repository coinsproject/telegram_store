from sqlalchemy import Column, Integer, ForeignKey, String
from sqlalchemy.orm import relationship
from app.database import Base

class LuckySpin(Base):
    __tablename__ = "lucky_spin"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    prize = Column(String)  # Например, "5% discount", "10% discount", "No Prize"

    user = relationship("User")
