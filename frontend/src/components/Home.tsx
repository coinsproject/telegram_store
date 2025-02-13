// ✅ Компонент Home.tsx (Главная страница)
import { Link } from "react-router-dom";

function Home() {
    return (
        <div className="min-h-screen bg-gray-100 text-gray-900 flex flex-col items-center p-4">
            <h1 className="text-2xl font-bold mb-4">Магазин парфюмерии</h1>
            <Link to="/admin" className="bg-blue-500 text-white p-2 rounded mt-4">Перейти в админ-панель</Link>
            <Link to="/cart" className="bg-green-500 text-white p-2 rounded mt-4">Перейти в корзину</Link>
        </div>
    );
}

export default Home;