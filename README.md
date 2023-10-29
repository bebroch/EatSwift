Нужно скопировать .env.example и прописать его

Далее нужно запустить docker-compose.yml

<pre>
docker compose -f "docker-compose.yml" up -d --build 
</pre>

В контейнере нужно запустить приложение

<pre>
npm run dev
</pre>
