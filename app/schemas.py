from pydantic import BaseModel

# Схема для создания продукта (когда товар добавляется)
class ProductCreate(BaseModel):
    name: str
    brand: str
    volume: float
    price: float

# Схема для ответа (с ID и фото)
class ProductResponse(ProductCreate):
    id: int
    image_url: str  # Поле для URL изображения

    class Config:
        orm_mode = True  # Позволяет работать с SQLAlchemy ORM
