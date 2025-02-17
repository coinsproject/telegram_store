# app/routes/user.py
from app.models import User  # ✅ Теперь User импортируется из models.py
from app.database import get_db
from fastapi import APIRouter, Depends

router = APIRouter()

@router.get("/users/{user_id}")
def get_user(user_id: int, db=Depends(get_db)):
    return db.query(User).filter(User.id == user_id).first()
