from fastapi import APIRouter, Depends, UploadFile, File, Form, HTTPException
from sqlalchemy.orm import Session
import shutil
import os
from app.database import get_db
from app.models import Product



router = APIRouter(prefix="/products", tags=["Products"])

# Определяем путь к директории для загрузки файлов
UPLOAD_DIR = "uploads"
os.makedirs(UPLOAD_DIR, exist_ok=True)

# Получение списка всех товаров
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
            "image_url": f"/{UPLOAD_DIR}/{p.image_url}" if p.image_url else None
        }
        for p in products
    ]

# Добавление нового товара с изображением
@router.post("/")
async def create_product(
    name: str = Form(...),
    brand: str = Form(...),
    volume: float = Form(...),
    price: float = Form(...),
    image: UploadFile = File(...),
    db: Session = Depends(get_db)
):
    # Проверяем, что файл изображения был загружен
    if not image:
        raise HTTPException(status_code=400, detail="Image file is required.")

    # Определяем путь для сохранения файла
    file_path = os.path.join(UPLOAD_DIR, image.filename)

    # Сохраняем файл на диск
    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(image.file, buffer)

    # Создаем новый объект товара
    new_product = Product(
        name=name,
        brand=brand,
        volume=volume,
        price=price,
        image_url=image.filename  # Сохраняем только имя файла
    )
    db.add(new_product)
    db.commit()
    db.refresh(new_product)
    return new_product

# Удаление товара по ID
@router.delete("/{product_id}")
async def delete_product(product_id: int, db: Session = Depends(get_db)):
    product = db.query(Product).filter(Product.id == product_id).first()
    if not product:
        raise HTTPException(status_code=404, detail="Product not found.")

    # Удаляем файл изображения, если он существует
    if product.image_url:
        image_path = os.path.join(UPLOAD_DIR, product.image_url)
        if os.path.exists(image_path):
            os.remove(image_path)

    db.delete(product)
    db.commit()
    return {"detail": "Product deleted successfully."}
