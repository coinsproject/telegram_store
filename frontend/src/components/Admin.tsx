import React, { useEffect, useState } from 'react';
import axios from 'axios';

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
    const [name, setName] = useState('');
    const [brand, setBrand] = useState('');
    const [volume, setVolume] = useState('');
    const [price, setPrice] = useState('');
    const [image, setImage] = useState<File | null>(null);

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const response = await axios.get<Product[]>('http://127.0.0.1:8000/products/');
            setProducts(response.data);
        } catch (error) {
            console.error('Ошибка при загрузке товаров:', error);
        }
    };

    const handleAddProduct = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!name || !brand || !volume || !price || !image) {
            alert('Пожалуйста, заполните все поля и выберите изображение.');
            return;
        }

        const formData = new FormData();
        formData.append('name', name);
        formData.append('brand', brand);
        formData.append('volume', volume);
        formData.append('price', price);
        formData.append('image', image);

        try {
            await axios.post('http://127.0.0.1:8000/products/', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            alert('Товар успешно добавлен!');
            setName('');
            setBrand('');
            setVolume('');
            setPrice('');
            setImage(null);
            fetchProducts();
        } catch (error) {
            console.error('Ошибка при добавлении товара:', error);
        }
    };

    const handleDeleteProduct = async (id: number) => {
        try {
            await axios.delete(`http://127.0.0.1:8000/products/${id}`);
            setProducts(products.filter((product) => product.id !== id));
        } catch (error) {
            console.error('Ошибка при удалении товара:', error);
        }
    };

    return (
        <div className="admin-panel">
            <h1>Админ-панель</h1>
            <form onSubmit={handleAddProduct} className="product-form">
                <input
                    type="text"
                    placeholder="Название"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
                <input
                    type="text"
                    placeholder="Бренд"
                    value={brand}
                    onChange={(e) => setBrand(e.target.value)}
                    required
                />
                <input
                    type="text"
                    placeholder="Объем"
                    value={volume}
                    onChange={(e) => setVolume(e.target.value)}
                    required
                />
                <input
                    type="number"
                    placeholder="Цена"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    required
                />
                <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setImage(e.target.files ? e.target.files[0] : null)}
                    required
                />
                <button type="submit">Добавить товар</button>
            </form>
            <h2>Список товаров</h2>
            <ul className="product-list">
                {products.map((product) => (
                    <li key={product.id} className="product-item">
                        <img src={product.image_url} alt={product.name} className="product-image" />
                        <div className="product-details">
                            <p>{product.name}</p>
                            <p>{product.brand}</p>
                            <p>{product.volume}</p>
                            <p>{product.price} руб.</p>
                            <button onClick={() => handleDeleteProduct(product.id)}>Удалить</button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Admin;
