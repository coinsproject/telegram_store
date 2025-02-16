import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import axios from "axios";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Layout from "./components/Layout";
import Home from "./components/Home";
import Cart from "./components/Cart"; // Исправленный импорт
import Admin from "./components/Admin";
import Profile from "./components/Profile";

interface Product {
  id: number;
  name: string;
  brand: string;
  volume: string;
  price: number;
  image_url: string;
}

interface CartItem extends Product {
  quantity: number;
}

const App: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [cart, setCart] = useState<CartItem[]>([]);

  // Загрузка товаров
  const fetchProducts = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:8000/products/");
      setProducts(response.data);
    } catch (error) {
      console.error("Ошибка загрузки продуктов:", error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Добавление товара в корзину
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
  };

  return (
    <Router>
      <ToastContainer />
      <Layout>
        <Routes>
          <Route path="/" element={<Home products={products} refreshProducts={fetchProducts} addToCart={addToCart} />} />
          <Route path="/cart" element={<Cart cart={cart} setCart={setCart} />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;
