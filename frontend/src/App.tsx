// frontend/src/App.tsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import CartPage from "./pages/Cart";
import Admin from "./pages/Admin";
import Profile from "./pages/Profile";
import { Product } from "./types/Product";
import { CartItem } from "./types/CartItem";

function App() {
  const [products, setProducts] = useState<Product[]>([]);
  const [cart, setCart] = useState<CartItem[]>([]);

  const fetchProducts = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:8000/products/");
      setProducts(response.data);
    } catch (error) {
      console.error("Ошибка при загрузке товаров:", error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const addToCart = (product: Product) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === product.id);
      if (existingItem) {
        return prevCart.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        return [...prevCart, { ...product, quantity: 1 }];
      }
    });
    toast.success(`${product.name} добавлен в корзину!`);
  };

  const removeFromCart = (productId: number) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
    toast.info("Товар удален из корзины.");
  };

  const updateQuantity = (productId: number, quantity: number) => {
    setCart((prevCart) =>
      prevCart.map((item) => (item.id === productId ? { ...item, quantity } : item))
    );
  };

  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home products={products} addToCart={addToCart} />} />
          <Route
            path="/cart"
            element={
              <CartPage
                cart={cart}
                removeFromCart={removeFromCart} // ✅ Исправлено
                updateQuantity={updateQuantity} // ✅ Исправлено
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
