import pytest
from sqlalchemy.orm import Session
from app.database import get_db, Base, engine
from app.models.user import User
from app.models.product import Product
from app.models.order import Order
import subprocess
import time

@pytest.fixture(scope="session", autouse=True)
def start_test_server():
    """Запускаем сервер перед тестами"""
    server = subprocess.Popen(["uvicorn", "app.main:app", "--host", "127.0.0.1", "--port", "8000"])
    time.sleep(2)  # Даем серверу запуститься
    yield
    server.terminate()

@pytest.fixture(scope="function", autouse=True)
def setup_and_teardown():
    """Создаёт тестовые данные перед тестами и очищает базу после"""
    db: Session = next(get_db())

    # Очищаем базу данных перед тестами
    Base.metadata.drop_all(bind=engine)
    Base.metadata.create_all(bind=engine)

    # Создаём тестового пользователя
    test_user = User(id=1, name="Тестовый пользователь", balance=1000, crystals=10)
    db.add(test_user)
    db.commit()

    # Создаём тестовый товар
    test_product = Product(
        id=1,
        name="Chanel No.5",
        brand="Chanel",
        volume=50,
        price=12000,
        image_url="https://example.com/image.jpg"
    )
    db.add(test_product)
    db.commit()

    # Создаём тестовый заказ
    test_order = Order(user_id=1, total_price=12000, status="pending")
    db.add(test_order)
    db.commit()

    yield  # Тесты выполняются после создания данных

    # Очищаем базу данных после тестов
    Base.metadata.drop_all(bind=engine)
