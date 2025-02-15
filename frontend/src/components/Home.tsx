import { useEffect, useState } from "react";
import axios from "axios";

interface Product {
    id: number;
    name: string;
    brand: string;
    volume: number;
    price: number;
    image_url: string;
}

interface HomeProps {
    products: Product[];
    addToCart: (product: Product) => void;
}

function Home({ products, addToCart }: HomeProps) {
    return (
        <div className="min-h-screen bg-gray-100 text-gray-900 flex flex-col items-center p-4">
            <h1 className="text-2xl font-bold mb-4">🛍️ Каталог парфюмерии</h1>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {products.map((product) => (
                    <div key={product.id} className="bg-white p-4 rounded-lg shadow-lg text-center">
                        <img src={`/uploads/${product.image_url}`} alt={product.name} className="w-full h-40 object-cover rounded-md mb-2" />
                        <h2 className="text-lg font-semibold">{product.name}</h2>
                        <p>{product.brand}</p>
                        <p>{product.volume} мл</p>
                        <p className="font-bold">{product.price} ₽</p>
                        <button onClick={() => addToCart(product)} className="bg-blue-500 text-white p-2 rounded mt-2">➕ Добавить</button>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Home;
