from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.database import get_db
from app.models import CartItem
from app.models import Product
from pydantic import BaseModel

router = APIRouter(prefix="/cart", tags=["Cart"])

class CartItemCreate(BaseModel):
    user_id: int
    product_id: int
    quantity: int = 1

@router.post("/")
def add_to_cart(cart_item: CartItemCreate, db: Session = Depends(get_db)):
    product = db.query(Product).filter(Product.id == cart_item.product_id).first()
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")

    new_cart_item = CartItem(
        user_id=cart_item.user_id,
        product_id=cart_item.product_id,
        quantity=cart_item.quantity
    )
    db.add(new_cart_item)
    db.commit()
    db.refresh(new_cart_item)
    return new_cart_item

@router.get("/{user_id}")
def get_cart(user_id: int, db: Session = Depends(get_db)):
    cart_items = db.query(CartItem).filter(CartItem.user_id == user_id).all()
    return cart_items

@router.delete("/{cart_id}")
def remove_from_cart(cart_id: int, db: Session = Depends(get_db)):
    cart_item = db.query(CartItem).filter(CartItem.id == cart_id).first()
    if not cart_item:
        raise HTTPException(status_code=404, detail="Cart item not found")

    db.delete(cart_item)
    db.commit()
    return {"message": "Item removed from cart"}
