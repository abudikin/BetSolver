# BetSolver

# BetSolver - Платформа для дружеских споров

## О проекте

BetSolver - это платформа для организации и отслеживания дружеских споров между друзьями. Приложение позволяет создавать споры, приглашать друзей в качестве участников или арбитров, загружать доказательства и определять победителя.

## Функциональность

- Создание споров с указанием условий и ставок
- Приглашение друзей в качестве участников и арбитров
- Загрузка доказательств (фото, видео, ссылки)
- Система уведомлений о новых спорах и результатах
- История споров и статистика "побед"
- Таймеры для споров с ограничением по времени
- Профили пользователей с репутацией и статистикой

## Технологический стек

### Фронтенд
- React/Next.js
- TypeScript
- Tailwind CSS
- Redux Toolkit
- React Query
- Socket.io-client
- React Hook Form
- Framer Motion

### Бэкенд
- Node.js (NestJS) – для построения надежного и масштабируемого серверного приложения.
- TypeScript – для строгой типизации и удобства разработки.
- PostgreSQL – основная база данных для хранения пользователей, споров и статистики.
- Redis – кеширование и обработка очередей задач (например, таймеры споров).
- WebSockets – для реализации системы уведомлений в реальном времени.

## Установка и запуск

1. Клонировать репозиторий

git clone https://github.com/abudikin/BetSolver

2. Установить зависимости
cd betsolver-frontend
npm install

3. Запустить проект в режиме разработки

4. Открыть [http://localhost:3000](http://localhost:3000) в браузере


