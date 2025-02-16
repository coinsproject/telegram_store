import React, { useEffect, useState } from "react";
import axios from "axios";

interface Product {
    id: number;
    name: string;
    brand: string;
    volume: string;
    price: number;
    image_url: string;
}

const Admin: React.FC = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [newProduct, setNewProduct] = useState({ name: "", brand: "", volume: "", price: "", image_url: "" });

    useEffect(() => {
        axios.get("http://127.0.0.1:8000/products/")
            .then((response) => setProducts(response.data))
            .catch((error) => console.error("Ошибка загрузки товаров:", error));
    }, []);

    const addProduct = async () => {
        await axios.post("http://127.0.0.1:8000/products/", newProduct);
        alert("Товар добавлен!");
        setNewProduct({ name: "", brand: "", volume: "", price: "", image_url: "" });
    };

    const deleteProduct = async (id: number) => {
        await axios.delete(`http://127.0.0.1:8000/products/${id}`);
        setProducts(products.filter((product) => product.id !== id));
    };

    return (
        <div>
            <h1>Управление товарами</h1>
            <h2>Добавить товар</h2>
            <input type="text" placeholder="Название" value={newProduct.name} onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })} />
            <input type="text" placeholder="Бренд" value={newProduct.brand} onChange={(e) => setNewProduct({ ...newProduct, brand: e.target.value })} />
            <input type="text" placeholder="Объем (мл)" value={newProduct.volume} onChange={(e) => setNewProduct({ ...newProduct, volume: e.target.value })} />
            <input type="text" placeholder="Цена" value={newProduct.price} onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })} />
            <input type="text" placeholder="Ссылка на изображение" value={newProduct.image_url} onChange={(e) => setNewProduct({ ...newProduct, image_url: e.target.value })} />
            <button onClick={addProduct}>Добавить</button>

            <h2>Список товаров</h2>
            <ul>
                {products.map((product) => (
                    <li key={product.id}>
                        {product.name} - {product.price} руб.
                        <button onClick={() => deleteProduct(product.id)}>Удалить</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Admin;
