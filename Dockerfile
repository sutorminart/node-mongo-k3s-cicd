# 1. Используем легкий образ Node.js (версия 20)
FROM node:20-alpine

# 2. Создаем рабочую папку внутри контейнера
WORKDIR /app

# 3. Копируем файлы package.json и package-lock.json 
COPY package*.json ./

# 4. Устанавливаем зависимости
# Используем npm ci для чистовой установки, если есть lock-файл, иначе npm install
RUN npm install

# 5. Копируем исходный код проекта (кроме того, что в .dockerignore)
COPY . .

# 6. Собираем фронтенд (Vite)
# Это создаст папку dist внутри контейнера
RUN npm run build

# 7. Открываем порт 3000
EXPOSE 3000

# 8. Запускаем сервер
CMD ["node", "server.js"]