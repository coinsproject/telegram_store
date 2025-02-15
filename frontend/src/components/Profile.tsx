import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function Profile() {
    const [balance, setBalance] = useState(0);

    useEffect(() => {
        axios.get("http://127.0.0.1:8000/user/profile")
            .then((response) => setBalance(response.data.balance))
            .catch(() => console.error("Ошибка загрузки профиля"));
    }, []);

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col items-center p-4">
            <h1 className="text-2xl font-bold mb-4">👤 Личный кабинет</h1>
            <p className="text-lg font-semibold">💎 Баланс: {balance} кристаллов</p>
            <Link to="/" className="bg-gray-500 text-white p-2 rounded mt-4">🏠 Главная</Link>
        </div>
    );
}

export default Profile;
