# Как запустить проект 
1. Прописываем .env из .env.example

1. Запускаем `docker-compose.yml`

```
docker compose -f "docker-compose.yml" up -d --build
```

3. Для запуска приложения, в контейнере нужно запустить `server.ts`

```
npm run dev
```

> [!NOTE]
> Приложение запуститься на http://localhost:5000/
