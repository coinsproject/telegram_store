telegram_store/
│── app/                  # 📂 Основная папка бэкенда (FastAPI)
│   ├── __init__.py        # 🔹 Инициализационный файл Python-модуля
│   ├── config.py          # 🔹 Конфигурации проекта
│   ├── database.py        # 🔹 Подключение к базе данных
│   ├── models.py          # 🔹 Описание моделей базы данных (ORM)
│   ├── schemas.py         # 🔹 Схемы Pydantic (входные и выходные данные API)
│   ├── main.py            # 🔹 Главный файл FastAPI-приложения
│   ├── routes/            # 📂 Папка с API-маршрутами
│   │   ├── user.py        # 🔹 API для пользователей
│   │   ├── product.py     # 🔹 API для товаров
│   │   ├── cart.py        # 🔹 API для корзины
│   │   ├── order.py       # 🔹 API для заказов
│   │   ├── payment.py     # 🔹 API для оплаты
│   │   ├── lucky_spin.py  # 🔹 API для мини-игры (колесо фортуны)
│── frontend/              # 📂 Фронтенд (React + TypeScript)
│   ├── src/               # 📂 Исходный код React-приложения
│   │   ├── App.tsx        # 🔹 Главный компонент React-приложения
│   │   ├── index.tsx      # 🔹 Точка входа в React-приложение
│   │   ├── components/    # 📂 Папка с React-компонентами
│   │   │   ├── Cart.tsx   # 🔹 Компонент корзины
│   │   │   ├── Admin.tsx  # 🔹 Компонент админ-панели
│   │   │   ├── Home.tsx   # 🔹 Главная страница с товарами
│   ├── public/            # 📂 Статические файлы (favicon, index.html)
│── tests/                 # 📂 Тесты (автоматическое тестирование)
│   ├── test_cart.py       # 🔹 Тесты API корзины
│   ├── test_orders.py     # 🔹 Тесты API заказов
│   ├── test_products.py   # 🔹 Тесты API товаров
│── .gitignore             # 🔹 Игнорируемые файлы Git
│── README.md              # 🔹 Документация проекта
│── requirements.txt       # 🔹 Список зависимостей для Python
│── package.json           # 🔹 Список зависимостей для React
│── vite.config.ts         # 🔹 Конфигурация Vite для React


