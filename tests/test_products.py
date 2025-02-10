import pytest
from httpx import AsyncClient

@pytest.mark.asyncio
async def test_create_product():
    async with AsyncClient(base_url="http://127.0.0.1:8000") as client:
        response = await client.post("/products/", json={
            "name": "Chanel No.5",
            "brand": "Chanel",
            "volume": 50,
            "price": 12000,
            "image_url": "https://example.com/image.jpg"
        })
    assert response.status_code == 200
    assert response.json()["name"] == "Chanel No.5"

@pytest.mark.asyncio
async def test_get_products():
    async with AsyncClient(base_url="http://127.0.0.1:8000") as client:
        response = await client.get("/products/")
    assert response.status_code == 200
    assert isinstance(response.json(), list)
