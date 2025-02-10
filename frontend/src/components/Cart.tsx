import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

// ✅ Интерфейс для товара в корзине
interface CartItem {
    id: number;
    name: string;
    brand: string;
    volume: number;
    price: number;
    quantity: number;
}

function Cart({ cart, removeFromCart, clearCart }: { cart: CartItem[], removeFromCart: (id: number) => void, clearCart: () => void }) {
    const totalPrice = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");

    const handleOrderSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const order = {
                name,
                phone,
                products: cart.map(({ id, quantity }) => ({ product_id: id, quantity })),
                total_price: totalPrice,
            };
            await axios.post("http://127.0.0.1:8000/orders/", order);
            alert("✅ Заказ успешно оформлен!");
            clearCart();
        } catch (error) {
            alert("❌ Ошибка при оформлении заказа.");
            console.error(error);
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 text-gray-900 flex flex-col items-center p-4">
            <h1 className="text-2xl font-bold mb-4">🛒 Корзина</h1>

            {cart.length === 0 ? (
                <p>Корзина пуста</p>
            ) : (
                <>
                    <div className="w-full max-w-md">
                        {cart.map((item) => (
                            <div key={item.id} className="bg-white p-4 rounded-lg shadow-md flex justify-between items-center mb-2">
                                <p>{item.name} ({item.quantity} шт.)</p>
                                <button onClick={() => removeFromCart(item.id)} className="bg-red-500 text-white p-1 rounded">Удалить</button>
                            </div>
                        ))}
                    </div>

                    <h2 className="text-xl font-semibold mt-4">Итого: {totalPrice} ₽</h2>

                    {/* ✅ Форма оформления заказа */}
                    <form onSubmit={handleOrderSubmit} className="bg-white p-4 rounded-lg shadow-md w-96 flex flex-col gap-3 mt-4">
                        <input type="text" placeholder="Ваше имя" value={name} onChange={(e) => setName(e.target.value)} className="border p-2 rounded" required />
                        <input type="tel" placeholder="Ваш телефон" value={phone} onChange={(e) => setPhone(e.target.value)} className="border p-2 rounded" required />
                        <button type="submit" className="bg-green-500 text-white p-2 rounded">Оформить заказ</button>
                    </form>
                </>
            )}

            <Link to="/" className="bg-gray-500 text-white p-2 rounded mt-4">Назад в магазин</Link>
        </div>
    );
}

export default Cart;
