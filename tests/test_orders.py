import pytest
from httpx import AsyncClient

@pytest.mark.asyncio
async def test_create_order():
    async with AsyncClient(base_url="http://127.0.0.1:8000") as client:
        response = await client.post("/orders/", json={"user_id": 1, "total_price": 12000})
    assert response.status_code == 200
    assert response.json()["status"] == "pending"

@pytest.mark.asyncio
async def test_update_order_status():
    async with AsyncClient(base_url="http://127.0.0.1:8000") as client:
        response = await client.put("/orders/1/status", json={"status": "processing"})
    assert response.status_code == 200
    assert response.json()["new_status"] == "processing"
