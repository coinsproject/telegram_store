import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import WebApp from "@twa-dev/sdk";
import axios from "axios";
import Cart from "./components/Cart";  // ✅ Добавляем импорт корзины


// ✅ Интерфейс для продукта
interface Product {
  id: number;
  name: string;
  brand: string;
  volume: number;
  price: number;
  image_url: string;
}

// ✅ Интерфейс для элемента корзины
interface CartItem extends Product {
  quantity: number;
}

function Home({ addToCart }: { addToCart: (product: Product) => void }) {
  const webApp = WebApp;
  const initDataRaw = webApp.initData;
  const initData = initDataRaw ? JSON.parse(initDataRaw) : null;

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (webApp?.expand) {
      webApp.expand();
    }

    axios.get("http://127.0.0.1:8000/products/")
      .then((response) => setProducts(response.data))
      .catch(() => setError("Ошибка загрузки товаров."))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 text-gray-900 flex flex-col items-center p-4">
      <h1 className="text-2xl font-bold mb-4">Магазин парфюмерии</h1>
      <p>Добро пожаловать, {initData?.user?.first_name ?? "Гость"}!</p>

      <Link to="/admin" className="bg-blue-500 text-white p-2 rounded mt-4">Перейти в админ-панель</Link>
      <Link to="/cart" className="bg-green-500 text-white p-2 rounded mt-4 ml-2">Корзина</Link>

      {loading ? (
        <p className="text-gray-500">Загрузка товаров...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <div className="grid grid-cols-2 gap-4 mt-4">
          {products.map((product) => (
            <div key={product.id} className="bg-white p-4 rounded-lg shadow-md flex flex-col items-center">
              <img src={`http://127.0.0.1:8000/uploads/${product.image_url}`} alt={product.name} className="w-32 h-32 object-cover mb-2" />
              <h2 className="text-lg font-semibold">{product.name}</h2>
              <p>{product.brand}</p>
              <p>{product.volume} мл</p>
              <p className="font-bold">{product.price} ₽</p>
              <button onClick={() => addToCart(product)} className="bg-blue-500 text-white p-2 rounded mt-2">Добавить в корзину</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ✅ Страница корзины
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
      alert("Заказ успешно оформлен!");
      clearCart();
    } catch (error) {
      alert("Ошибка при оформлении заказа.");
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

// ✅ Главный компонент
function App() {
  const [cart, setCart] = useState<CartItem[]>([]);

  const addToCart = (product: Product) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === product.id);
      if (existingItem) {
        return prevCart.map((item) => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (id: number) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
  };

  const clearCart = () => {
    setCart([]);
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home addToCart={addToCart} />} />
        <Route path="/cart" element={<Cart cart={cart} removeFromCart={removeFromCart} clearCart={clearCart} />} />
      </Routes>
    </Router>
  );
}

export default App;
