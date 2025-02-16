import React from "react";

interface CartItem {
    id: number;
    name: string;
    brand: string;
    volume: string;
    price: number;
    image_url: string;
    quantity: number;
}

interface CartProps {
    cart: CartItem[];
    setCart: React.Dispatch<React.SetStateAction<CartItem[]>>;
}

const Cart: React.FC<CartProps> = ({ cart, setCart }) => {
    // Удаление товара из корзины
    const removeFromCart = (id: number) => {
        setCart(cart.filter((item) => item.id !== id));
    };

    // Очистка всей корзины
    const clearCart = () => {
        setCart([]);
    };

    return (
        <div>
            <h1>Корзина</h1>
            {cart.length === 0 ? <p>Корзина пуста</p> : (
                <ul>
                    {cart.map((item) => (
                        <li key={item.id}>
                            {item.name} - {item.brand} - {item.volume} мл - {item.price} руб. x {item.quantity}
                            <button onClick={() => removeFromCart(item.id)}>Удалить</button>
                        </li>
                    ))}
                </ul>
            )}
            {cart.length > 0 && <button onClick={clearCart}>Очистить корзину</button>}
        </div>
    );
};

export default Cart;
