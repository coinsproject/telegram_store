import { Link } from "react-router-dom";

interface CartItem {
    id: number;
    name: string;
    price: number;
    quantity: number;
}

interface CartProps {
    cart: CartItem[];
    removeFromCart: (id: number) => void;
}

function Cart({ cart, removeFromCart }: CartProps) {
    return (
        <div className="min-h-screen bg-gray-100 text-gray-900 flex flex-col items-center p-4">
            <h1 className="text-2xl font-bold mb-4">🛒 Корзина</h1>
            {cart.length === 0 ? <p>Корзина пуста</p> : (
                <div>
                    {cart.map((item) => (
                        <div key={item.id} className="p-4 shadow-md flex justify-between">
                            <p>{item.name} ({item.quantity} шт.)</p>
                            <p>{item.price * item.quantity} ₽</p>
                            <button onClick={() => removeFromCart(item.id)} className="bg-red-500 text-white p-2 rounded">❌</button>
                        </div>
                    ))}
                </div>
            )}
            <Link to="/" className="bg-gray-500 text-white p-2 rounded mt-4">🏠 Главная</Link>
        </div>
    );
}

export default Cart;
