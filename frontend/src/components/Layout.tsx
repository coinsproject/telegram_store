import { Link } from "react-router-dom";

function Layout({ children }: { children: React.ReactNode }) {
    return (
        <div className="min-h-screen flex flex-col">
            <nav className="bg-gray-800 text-white p-4 flex justify-around">
                <Link to="/" className="hover:underline">🏠 Главная</Link>
                <Link to="/cart" className="hover:underline">🛒 Корзина</Link>
                <Link to="/admin" className="hover:underline">⚙️ Админка</Link>
                <Link to="/profile" className="hover:underline">👤 Профиль</Link>
            </nav>
            <main className="flex-grow p-4">{children}</main>
            <footer className="bg-gray-800 text-white p-4 text-center">© 2024 Магазин парфюмерии</footer>
        </div>
    );
}

export default Layout;
