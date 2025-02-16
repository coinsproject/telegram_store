// frontend/src/pages/Cart.tsx
import React from 'react';
import { CartItem } from '../types/CartItem';

interface CartProps {
    cart: CartItem[];
    removeFromCart: (productId: number) => void;
    updateQuantity: (productId: number, quantity: number) => void;
}

const Cart: React.FC<CartProps> = ({ cart, removeFromCart, updateQuantity }) => {
    return (
        <div className="cart-container">
            {cart.length > 0 ? (
                cart.map((item) => (
                    <div key={item.id} className="cart-item">
                        <h3>{item.name}</h3>
                        <p>Количество: {item.quantity}</p>
                        <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
                        <button onClick={() => updateQuantity(item.id, item.quantity - 1)}>-</button>
                        <button onClick={() => removeFromCart(item.id)}>Удалить</button>
                    </div>
                ))
            ) : (
                <p>Корзина пуста</p>
            )}
        </div>
    );
};

export default Cart;
