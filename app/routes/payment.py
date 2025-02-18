from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.database import get_db
from app.models import Order
from pydantic import BaseModel

router = APIRouter(prefix="/payments", tags=["Payments"])

class PaymentRequest(BaseModel):
    order_id: int
    payment_method: str  # "yookassa", "cloudpayments", "telegram", "bank_transfer"

@router.post("/")
def process_payment(payment: PaymentRequest, db: Session = Depends(get_db)):
    order = db.query(Order).filter(Order.id == payment.order_id).first()
    if not order:
        raise HTTPException(status_code=404, detail="Order not found")

    # Симуляция обработки платежа
    if payment.payment_method in ["yookassa", "cloudpayments", "telegram"]:
        order.payment_status = "paid"
    elif payment.payment_method == "bank_transfer":
        order.payment_status = "pending"  # Ждём подтверждения
    else:
        raise HTTPException(status_code=400, detail="Invalid payment method")

    order.payment_method = payment.payment_method
    db.commit()
    db.refresh(order)

    return {"message": "Payment processed", "payment_status": order.payment_status}
