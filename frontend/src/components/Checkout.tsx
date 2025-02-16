import React, { useState } from "react";
import axios from "axios";

interface CheckoutProps {
    cart: { id: number; name: string; price: number; quantity: number }[];
    setCart: React.Dispatch<React.SetStateAction<[]>>;
}

const Checkout: React.FC<CheckoutProps> = ({ cart, setCart }) => {
    const [phone, setPhone] = useState("");

    const handleOrder = async () => {
        try {
            const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
            await axios.post("http://127.0.0.1:8000/orders/", {
                phone,
                total_price: total,
                status: "в обработке",
            });
            alert("Заказ оформлен! Мы свяжемся с вами для подтверждения.");
            setCart([]); // Очищаем корзину
        } catch (error) {
            console.error("Ошибка оформления заказа:", error);
        }
    };

    return (
        <div>
            <h1>Оформление заказа</h1>
            <input
                type="text"
                placeholder="Введите номер телефона"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
            />
            <button onClick={handleOrder}>Оформить заказ</button>
        </div>
    );
};

export default Checkout;
