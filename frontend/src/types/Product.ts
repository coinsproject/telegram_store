// frontend/src/types/Product.ts
export interface Product {
    id: number;
    name: string;
    brand: string;
    volume: string;
    description: string;  // ✅ Добавлено
    price: number;
    image_url: string;
}
