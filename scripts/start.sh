# 1- copy  env file
cp .env.example  .env

# 2- run docker compose
docker-compose down && docker-compose build && docker-compose up -d