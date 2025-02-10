from sqlalchemy import Column, Integer, String, Float
from app.database import Base

class Product(Base):
    __tablename__ = "products"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)
    brand = Column(String, index=True)
    volume = Column(Float)  # Объем в мл
    price = Column(Float)  # Цена
    image_url = Column(String, nullable=True)  # Фото товара
