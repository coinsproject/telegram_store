import requests
from app.config import YOOKASSA_SHOP_ID, YOOKASSA_SECRET_KEY

YOOKASSA_URL = "https://api.yookassa.ru/v3/payments"

def create_yookassa_payment(amount, order_id, return_url):
    headers = {
        "Content-Type": "application/json",
        "Authorization": f"Basic {YOOKASSA_SECRET_KEY}",
    }
    data = {
        "amount": {"value": f"{amount:.2f}", "currency": "RUB"},
        "capture": True,
        "confirmation": {"type": "redirect", "return_url": return_url},
        "description": f"Order {order_id}"
    }
    response = requests.post(YOOKASSA_URL, json=data, headers=headers)
    return response.json()
