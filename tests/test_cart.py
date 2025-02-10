import pytest
from httpx import AsyncClient

@pytest.mark.asyncio
async def test_add_to_cart():
    """Тест добавления товара в корзину"""
    async with AsyncClient(base_url="http://127.0.0.1:8000") as client:
        response = await client.post("/cart/", json={"user_id": 1, "product_id": 1, "quantity": 2})
    
    assert response.status_code == 200, f"Ошибка: {response.text}"
    assert "id" in response.json(), "Ответ не содержит ID корзины"

@pytest.mark.asyncio
async def test_get_cart():
    """Тест получения списка товаров в корзине"""
    async with AsyncClient(base_url="http://127.0.0.1:8000") as client:
        response = await client.get("/cart/1")
    
    assert response.status_code == 200, f"Ошибка: {response.text}"
    assert isinstance(response.json(), list), "Ответ не является списком"

@pytest.mark.asyncio
async def test_remove_from_cart():
    """Тест удаления товара из корзины"""
    async with AsyncClient(base_url="http://127.0.0.1:8000") as client:
        response = await client.delete("/cart/1")
    
    assert response.status_code == 200, f"Ошибка: {response.text}"
    assert response.json()["message"] == "Item removed from cart"
