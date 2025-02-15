import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Layout from "./components/Layout";
import Home from "./components/Home";
import CartPage from "./components/Cart";
import Admin from "./components/Admin";
import Profile from "./components/Profile";

interface Product {
  id: number;
  name: string;
  brand: string;
  volume: number;
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
    axios.get("http://127.0.0.1:8000/products/")
      .then((response) => setProducts(response.data))
      .catch(() => console.error("Ошибка загрузки товаров."));
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
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
    toast.success("✅ Товар добавлен в корзину!");
  };

  const removeFromCart = (id: number) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
    toast.info("❌ Товар удалён из корзины");
  };

  return (
    <>
      <ToastContainer />
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Home products={products} addToCart={addToCart} />} />
            <Route path="/cart" element={<CartPage cart={cart} removeFromCart={removeFromCart} />} />
            <Route path="/admin" element={<Admin refreshProducts={fetchProducts} />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
        </Layout>
      </Router>
    </>
  );
}

export default App;
