
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from app.database import get_db
from app.models import Order, OrderItem, Product  # ✅ Теперь импорт корректный
from pydantic import BaseModel

router = APIRouter(prefix="/orders", tags=["Orders"])

# ✅ Схемы для Pydantic
class OrderItemCreate(BaseModel):
    product_id: int
    quantity: int

class OrderCreate(BaseModel):
    name: str
    phone: str
    products: List[OrderItemCreate]
    total_price: float

# ✅ Создание заказа
@router.post("/")
def create_order(order: OrderCreate, db: Session = Depends(get_db)):
    new_order = Order(name=order.name, phone=order.phone, total_price=order.total_price, status="pending")
    db.add(new_order)
    db.commit()
    db.refresh(new_order)

    # Добавляем товары в заказ
    for item in order.products:
        product = db.query(Product).filter(Product.id == item.product_id).first()
        if not product:
            raise HTTPException(status_code=404, detail=f"Product ID {item.product_id} not found")
        order_item = OrderItem(order_id=new_order.id, product_id=item.product_id, quantity=item.quantity)
        db.add(order_item)
    
    db.commit()
    return {"message": "Заказ успешно создан!", "order_id": new_order.id}

# ✅ Получение списка заказов
@router.get("/")
def get_orders(db: Session = Depends(get_db)):
    return db.query(Order).all()

# ✅ Получение деталей заказа
@router.get("/{order_id}")
def get_order(order_id: int, db: Session = Depends(get_db)):
    order = db.query(Order).filter(Order.id == order_id).first()
    if not order:
        raise HTTPException(status_code=404, detail="Order not found")
    return order

# ✅ Обновление статуса заказа
class OrderStatusUpdate(BaseModel):
    status: str  # "pending", "processing", "shipped", "delivered"

@router.put("/{order_id}/status")
def update_order_status(order_id: int, status_update: OrderStatusUpdate, db: Session = Depends(get_db)):
    order = db.query(Order).filter(Order.id == order_id).first()
    if not order:
        raise HTTPException(status_code=404, detail="Order not found")

    if status_update.status not in ["pending", "processing", "shipped", "delivered"]:
        raise HTTPException(status_code=400, detail="Invalid status")

    order.status = status_update.status
    db.commit()
    db.refresh(order)
    return {"message": "Статус заказа обновлён", "new_status": order.status}
