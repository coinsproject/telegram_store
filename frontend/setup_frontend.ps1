# Проверяем, установлен ли Node.js
if (-not (Get-Command node -ErrorAction SilentlyContinue)) {
    Write-Host "⚠️ Node.js не найден. Установите Node.js и повторите попытку."
    exit 1
}

# Проверяем, установлен ли npm
if (-not (Get-Command npm -ErrorAction SilentlyContinue)) {
    Write-Host "⚠️ npm не найден. Установите npm и повторите попытку."
    exit 1
}

# Переход в папку frontend
Set-Location -Path $PSScriptRoot

# Устанавливаем зависимости
Write-Host "🚀 Устанавливаем зависимости..."
npm install

# Устанавливаем TailwindCSS и PostCSS
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p

# Проверяем и настраиваем tailwind.config.js
if (-not (Test-Path "tailwind.config.js")) {
    Write-Host "❌ Файл tailwind.config.js не найден. Создаём новый..."
    @"
export default { content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'], theme: { extend: {} }, plugins: [] }
"@ | Set-Content tailwind.config.js
}

# Проверяем и настраиваем postcss.config.js
if (-not (Test-Path "postcss.config.js")) {
    Write-Host "❌ Файл postcss.config.js не найден. Создаём новый..."
    @"
export default { plugins: { tailwindcss: {}, autoprefixer: {} } }
"@ | Set-Content postcss.config.js
}

# Запускаем Frontend
Write-Host "🚀 Запускаем Vite-сервер..."
npm run dev
