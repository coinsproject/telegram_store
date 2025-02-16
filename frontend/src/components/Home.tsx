import React from "react";
import { Link } from "react-router-dom";

interface Product {
    id: number;
    name: string;
    brand: string;
    volume: string;
    price: number;
    image_url: string;
}

interface HomeProps {
    products: Product[];
    refreshProducts: () => void;
    addToCart: (product: Product) => void;
}

const Home: React.FC<HomeProps> = ({ products, refreshProducts, addToCart }) => {
    return (
        <div>
            <h1>Каталог товаров</h1>
            <button onClick={refreshProducts}>Обновить товары</button>
            <ul>
                {products.map((product) => (
                    <li key={product.id}>
                        <Link to={`/product/${product.id}`}>{product.name}</Link> - {product.brand} - {product.volume} мл - {product.price} руб.
                        <button onClick={() => addToCart(product)}>В корзину</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Home;
