import React from 'react';
import './ProductCard.css';

interface ProductCardProps {
    id: number;
    name: string;
    description: string;
    price: number;
    imageUrl: string;
}

const ProductCard: React.FC<ProductCardProps> = ({ name, description, price, imageUrl }) => {
    return (
        <div className="product-card">
            <img src={imageUrl} alt={name} className="product-image" />
            <h2 className="product-name">{name}</h2>
            <p className="product-description">{description}</p>
            <p className="product-price">{price} руб.</p>
        </div>
    );
};

export default ProductCard;