import requests
from app.config import CLOUDPAYMENTS_PUBLIC_ID, CLOUDPAYMENTS_SECRET_KEY

CLOUDPAYMENTS_URL = "https://api.cloudpayments.ru/payments/cards/charge"

def create_cloudpayments_payment(amount, order_id, card_token):
    headers = {
        "Content-Type": "application/json",
        "X-Api-Id": CLOUDPAYMENTS_PUBLIC_ID,
        "X-Api-Key": CLOUDPAYMENTS_SECRET_KEY,
    }
    data = {
        "Amount": amount,
        "Currency": "RUB",
        "InvoiceId": str(order_id),
        "Token": card_token,
    }
    response = requests.post(CLOUDPAYMENTS_URL, json=data, headers=headers)
    return response.json()
