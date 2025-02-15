import os
import logging
from fastapi import FastAPI, Depends 
from fastapi.staticfiles import StaticFiles  # ✅ Подключаем раздачу статики
from fastapi.middleware.cors import CORSMiddleware
from app.database import Base, engine
from app.routes import user, product, order, cart, payment, lucky_spin
from pydantic import BaseModel
from database import get_user_data


# ✅ Директория загрузки изображений
UPLOAD_DIR = "uploads"
os.makedirs(UPLOAD_DIR, exist_ok=True)  # Создаём папку, если её нет

# ✅ Логирование
logging.basicConfig(level=logging.DEBUG)

# ✅ Создание базы данных
Base.metadata.create_all(bind=engine)

app = FastAPI()

class UserProfileResponse(BaseModel):
    balance: int
    orders: list[dict]

app.get("/user/profile", response_model=UserProfileResponse)
def get_profile(user_id: int = 1):  # ⚠ Временное решение, user_id будет приходить из JWT
    user_data = get_user_data(user_id)
    return user_data

# ✅ Запуск FastAPI
app = FastAPI()

# ✅ Разрешаем CORS для фронтенда
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ✅ Подключаем маршруты
app.include_router(user.router)
app.include_router(product.router)
app.include_router(order.router)
app.include_router(cart.router)
app.include_router(payment.router)
app.include_router(lucky_spin.router)

# ✅ Раздача загруженных изображений (исправляем путь!)
app.mount("/uploads", StaticFiles(directory=UPLOAD_DIR), name="uploads")

@app.get("/")
def home():
    return {"message": "FastAPI работает!"}
