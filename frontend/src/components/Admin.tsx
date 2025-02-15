import { useState } from "react";
import axios from "axios";

function Admin() {
    const [name, setName] = useState("");
    const [brand, setBrand] = useState("");
    const [price, setPrice] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        await axios.post("http://127.0.0.1:8000/products", { name, brand, price });
    };

    return (
        <div className="min-h-screen p-4">
            <h1>Админ-панель</h1>
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder="Название" value={name} onChange={(e) => setName(e.target.value)} />
                <input type="text" placeholder="Бренд" value={brand} onChange={(e) => setBrand(e.target.value)} />
                <input type="number" placeholder="Цена" value={price} onChange={(e) => setPrice(e.target.value)} />
                <button type="submit">Добавить</button>
            </form>
        </div>
    );
}

export default Admin;
