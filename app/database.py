# app/database.py
from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from app.config import DATABASE_URL  # ✅ Убедитесь, что путь верный

# Создаём движок базы данных
engine = create_engine(DATABASE_URL, connect_args={"check_same_thread": False})

# Создаём базовый класс моделей
Base = declarative_base()

# Создаём сессию базы данных
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# Получение сессии базы данных
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
