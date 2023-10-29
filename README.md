Нужно скопировать .env.example и прописать его

Далее нужно запустить `docker-compose.yml`

```
docker compose -f "docker-compose.yml" up -d --build
```

Далее в контейнере нужно запустить `server.ts`

```
npm run dev
```
