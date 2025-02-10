from fastapi import APIRouter, Depends, UploadFile, File, Form
from sqlalchemy.orm import Session
import shutil
import os

from app.database import get_db
from app.models.product import Product

router = APIRouter(prefix="/products", tags=["Products"])

UPLOAD_DIR = "uploads"
os.makedirs(UPLOAD_DIR, exist_ok=True)

# ✅ Получение списка товаров (исправленный путь к `image_url`)
@router.get("/")
async def get_products(db: Session = Depends(get_db)):
    products = db.query(Product).all()
    return [
        {
            "id": p.id,
            "name": p.name,
            "brand": p.brand,
            "volume": p.volume,
            "price": p.price,
            "image_url": f"/uploads/{p.image_url}" if p.image_url else None  # ✅ Исправляем дублирование `/uploads/`
        }
        for p in products
    ]

# ✅ Добавление товара с фото
@router.post("/")
async def create_product(
    name: str = Form(...),
    brand: str = Form(...),
    volume: float = Form(...),
    price: float = Form(...),
    image: UploadFile = File(...),
    db: Session = Depends(get_db),
):
    # ✅ Сохраняем изображение с уникальным именем
    image_path = os.path.join(UPLOAD_DIR, image.filename)

    with open(image_path, "wb") as buffer:
        shutil.copyfileobj(image.file, buffer)

    new_product = Product(
        name=name,
        brand=brand,
        volume=volume,
        price=price,
        image_url=image.filename  # ✅ Теперь сохраняем только имя файла
    )
    db.add(new_product)
    db.commit()
    db.refresh(new_product)

    return {"message": "Товар добавлен!", "product": new_product}
