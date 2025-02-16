import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

interface Product {
    id: number;
    name: string;
    brand: string;
    volume: string;
    price: number;
    image_url: string;
    description: string;
}

interface ProductPageProps {
    addToCart: (product: Product) => void;
}

const ProductPage: React.FC<ProductPageProps> = ({ addToCart }) => {
    const { id } = useParams<{ id: string }>();
    const [product, setProduct] = useState<Product | null>(null);

    useEffect(() => {
        axios.get(`http://127.0.0.1:8000/products/${id}`)
            .then((response) => setProduct(response.data))
            .catch((error) => console.error("Ошибка загрузки товара:", error));
    }, [id]);

    if (!product) return <p>Загрузка...</p>;

    return (
        <div>
            <h1>{product.name}</h1>
            <img src={`http://127.0.0.1:8000${product.image_url}`} alt={product.name} />
            <p><strong>Бренд:</strong> {product.brand}</p>
            <p><strong>Объем:</strong> {product.volume} мл</p>
            <p><strong>Цена:</strong> {product.price} руб.</p>
            <p><strong>Описание:</strong> {product.description}</p>
            <button onClick={() => addToCart(product)}>Добавить в корзину</button>
        </div>
    );
};

export default ProductPage;
