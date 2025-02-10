import requests
from app.config import TELEGRAM_BOT_TOKEN

TELEGRAM_URL = f"https://api.telegram.org/bot{TELEGRAM_BOT_TOKEN}/sendInvoice"

def create_telegram_payment(chat_id, title, description, payload, price):
    data = {
        "chat_id": chat_id,
        "title": title,
        "description": description,
        "payload": payload,
        "provider_token": "YOUR_PROVIDER_TOKEN",
        "currency": "RUB",
        "prices": [{"label": "Order", "amount": int(price * 100)}],
        "start_parameter": "order-payment",
    }
    response = requests.post(TELEGRAM_URL, json=data)
    return response.json()
