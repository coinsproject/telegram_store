// ✅ Главный файл App.tsx
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import WebApp from "@twa-dev/sdk";
import axios from "axios";
import CartPage from "./components/Cart";
import Admin from "./components/Admin"; // ✅ Добавили импорт админки

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

  const fetchProducts = () => {
    axios.get("http://127.0.0.1:8000/products/")
      .then((response) => setProducts(response.data))
      .catch(() => setError("Ошибка загрузки товаров."))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    if (webApp?.expand) {
      webApp.expand();
    }
    fetchProducts();
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
        <Route path="/cart" element={<CartPage cart={cart} removeFromCart={removeFromCart} clearCart={clearCart} />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </Router>
  );
}

export default App;