import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import CartPage from "./pages/Cart"; // Переместил CartPage в pages
import Admin from "./pages/Admin"; // Переместил Admin в pages
import Profile from "./pages/Profile"; // Переместил Profile в pages

interface Product {
  id: number;
  name: string;
  brand: string;
  volume: string; // Исправил на string, так как может быть "50 мл"
  price: number;
  image_url: string;
}

interface CartItem extends Product {
  quantity: number;
}

function App() {
  const [products, setProducts] = useState<Product[]>([]);
  const [cart, setCart] = useState<CartItem[]>([]);

  const fetchProducts = () => {
    axios
      .get("http://127.0.0.1:8000/products/")
      .then((response) =>
        setProducts(
          response.data.map((product: any) => ({
            ...product,
            volume: String(product.volume), // Преобразуем в строку
          }))
        )
      )
      .catch((error) => console.error("Ошибка при загрузке товаров:", error));
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const addToCart = (product: Product) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === product.id);
      if (existingItem) {
        return prevCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prevCart, { ...product, quantity: 1 }];
      }
    });
    toast.success(`${product.name} добавлен в корзину!`);
  };

  const removeFromCart = (productId: number) => {
    setCart((prevCart) =>
      prevCart.filter((item) => item.id !== productId)
    );
    toast.info("Товар удален из корзины.");
  };

  const updateQuantity = (productId: number, quantity: number) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === productId ? { ...item, quantity } : item
      )
    );
  };

  return (
    <Router>
      <Layout>
        <Routes>
          <Route
            path="/"
            element={<Home products={products} addToCart={addToCart} />}
          />
          <Route
            path="/cart"
            element={
              <CartPage
                cart={cart}
                removeFromCart={removeFromCart}
                updateQuantity={updateQuantity}
              />
            }
          />
          <Route path="/admin" element={<Admin />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </Layout>
      <ToastContainer />
    </Router>
  );
}

export default App;
