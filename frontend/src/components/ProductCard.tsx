// frontend/src/components/ProductCard.tsx
import React from 'react';
import { Product } from '../types/Product';
import './ProductCard.css';

interface ProductCardProps {
    product: Product;
    addToCart: (product: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, addToCart }) => {
    return (
        <div className="product-card">
            <img src={product.image_url} alt={product.name} className="product-image" />
            <h2 className="product-name">{product.name}</h2>
            <p className="product-description">{product.description}</p>
            <p className="product-price">{product.price} руб.</p>
            <button onClick={() => addToCart(product)}>Добавить в корзину</button>
        </div>
    );
};

export default ProductCard;
