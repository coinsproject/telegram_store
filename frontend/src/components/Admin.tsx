// ✅ Обновленный компонент Admin.tsx (Админ-панель с формой добавления товаров)
import { Link } from "react-router-dom"; // ✅ Добавлен импорт Link

function Admin({ refreshProducts }: { refreshProducts: () => void }) {
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        // ... код для отправки товара на сервер
        refreshProducts(); // ✅ Обновляем список товаров
    };

    return (
        <div className="min-h-screen bg-gray-100 text-gray-900 flex flex-col items-center p-4">
            <h1 className="text-2xl font-bold mb-4 text-red-500">Админ-панель</h1>
            <p>Добавление нового товара</p>
            <form onSubmit={handleSubmit} className="bg-white p-4 rounded-lg shadow-md w-96 flex flex-col gap-3">
                <input type="text" placeholder="Название товара" className="border p-2 rounded" required />
                <input type="text" placeholder="Бренд" className="border p-2 rounded" required />
                <input type="number" placeholder="Объем (мл)" className="border p-2 rounded" required />
                <input type="number" placeholder="Цена (₽)" className="border p-2 rounded" required />
                <input type="file" className="border p-2 rounded" required />
                <button type="submit" className="bg-blue-500 text-white p-2 rounded">Добавить товар</button>
            </form>
            <Link to="/" className="bg-gray-500 text-white p-2 rounded mt-4">Назад в магазин</Link>
        </div>
    );
}

export default Admin;
