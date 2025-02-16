// frontend/src/pages/Home.tsx
import React from 'react';
import ProductCard from '../components/ProductCard';
import { Product } from '../types/Product';
import './Home.css';

interface HomeProps {
    products: Product[];
    addToCart: (product: Product) => void;
}

const Home: React.FC<HomeProps> = ({ products, addToCart }) => {
    return (
        <div className="product-list">
            {products.map((product) => (
                <ProductCard
                    key={product.id}
                    product={product}
                    addToCart={addToCart}
                />
            ))}
        </div>
    );
};

export default Home;
