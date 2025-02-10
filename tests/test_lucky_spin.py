import pytest
from httpx import AsyncClient

@pytest.mark.asyncio
async def test_spin_wheel():
    async with AsyncClient(base_url="http://127.0.0.1:8000") as client:
        response = await client.post("/lucky_spin/", json={"user_id": 1})
    assert response.status_code == 200
    assert "prize" in response.json()
