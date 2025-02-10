import random
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.database import get_db
from app.models.lucky_spin import LuckySpin
from app.models.user import User
from pydantic import BaseModel

router = APIRouter(prefix="/lucky_spin", tags=["Lucky Spin"])

PRIZES = ["5% discount", "10% discount", "Free Shipping", "No Prize"]

class SpinRequest(BaseModel):
    user_id: int

@router.post("/")
def spin_wheel(spin: SpinRequest, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.id == spin.user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    # Проверяем, есть ли у пользователя кристаллы (флаконы)
    if user.crystals < 1:
        raise HTTPException(status_code=400, detail="Not enough crystals to spin")

    # Уменьшаем число кристаллов на 1
    user.crystals -= 1

    # Определяем случайный приз
    prize = random.choice(PRIZES)

    # Сохраняем результат игры
    lucky_spin = LuckySpin(user_id=spin.user_id, prize=prize)
    db.add(lucky_spin)
    db.commit()
    db.refresh(lucky_spin)

    return {"message": "Spin result", "prize": prize}
