import { useState, useEffect } from "react";
import axios from "axios";

interface Product {
    id: number;
    name: string;
    brand: string;
    volume: number;
    price: number;
    image_url: string;
}

function Admin() {
    const [products, setProducts] = useState<Product[]>([]);
    const [newProduct, setNewProduct] = useState({ name: "", brand: "", volume: "", price: "" });
    const [image, setImage] = useState<File | null>(null);

    useEffect(() => {
        axios.get("http://127.0.0.1:8000/products/")
            .then((response) => setProducts(response.data))
            .catch((error) => console.error("Ошибка загрузки товаров:", error));
    }, []);

    // Функция добавления нового товара
    const addProduct = () => {
        const formData = new FormData();
        formData.append("name", newProduct.name);
        formData.append("brand", newProduct.brand);
        formData.append("volume", newProduct.volume);
        formData.append("price", newProduct.price);
        if (image) {
            formData.append("image", image);
        }

        axios.post("http://127.0.0.1:8000/products/", formData, {
            headers: { "Content-Type": "multipart/form-data" }
        })
            .then((response) => {
                setProducts([...products, response.data]);
                setNewProduct({ name: "", brand: "", volume: "", price: "" });
                setImage(null);
            })
            .catch((error) => console.error("Ошибка добавления товара:", error));
    };

    return (
        <div className="min-h-screen bg-gray-100 text-gray-900 flex flex-col items-center p-4">
            <h1 className="text-2xl font-bold mb-4">Админ-панель</h1>

            {/* Форма для добавления товаров */}
            <div className="bg-white p-4 rounded-lg shadow-md w-96 mb-6">
                <h2 className="text-lg font-semibold mb-2">Добавить товар</h2>
                <input className="border p-2 w-full mb-2" placeholder="Название" value={newProduct.name} onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })} />
                <input className="border p-2 w-full mb-2" placeholder="Бренд" value={newProduct.brand} onChange={(e) => setNewProduct({ ...newProduct, brand: e.target.value })} />
                <input className="border p-2 w-full mb-2" placeholder="Объем (мл)" type="number" value={newProduct.volume} onChange={(e) => setNewProduct({ ...newProduct, volume: e.target.value })} />
                <input className="border p-2 w-full mb-2" placeholder="Цена (₽)" type="number" value={newProduct.price} onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })} />
                <input className="border p-2 w-full mb-2" type="file" onChange={(e) => setImage(e.target.files?.[0] || null)} />
                <button className="bg-blue-500 text-white p-2 w-full" onClick={addProduct}>Добавить</button>
            </div>

            {/* Список товаров */}
            <div className="w-96">
                {products.map((product) => (
                    <div key={product.id} className="bg-white p-4 rounded-lg shadow-md mb-2 flex flex-col items-center">
                        <img src={`http://127.0.0.1:8000/${product.image_url}`} alt={product.name} className="w-32 h-32 object-cover mb-2" />
                        <h2 className="text-lg font-semibold">{product.name}</h2>
                        <p>{product.brand}</p>
                        <p>{product.volume} мл</p>
                        <p className="font-bold">{product.price} ₽</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Admin;
