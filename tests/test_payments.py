import pytest
from httpx import AsyncClient


@pytest.mark.asyncio
async def test_process_payment():
    async with AsyncClient(base_url="http://127.0.0.1:8000") as client:
        response = await client.post("/payments/", json={"order_id": 1, "payment_method": "yookassa"})
    assert response.status_code == 200
    assert response.json()["payment_status"] == "paid"
