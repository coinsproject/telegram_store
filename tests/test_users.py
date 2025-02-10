import pytest
from httpx import AsyncClient


@pytest.mark.asyncio
async def test_create_user():
    async with AsyncClient(base_url="http://127.0.0.1:8000") as client:
        response = await client.post("/users/", json={"name": "Тестовый пользователь"})
    assert response.status_code == 200
    assert response.json()["name"] == "Тестовый пользователь"


@pytest.mark.asyncio
async def test_get_user():
    async with AsyncClient(base_url="http://127.0.0.1:8000") as client:
        response = await client.get("/users/1")
    assert response.status_code == 200
    assert response.json()["id"] == 1
