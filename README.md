# README

Simple CRUD for cats, cat's weight history (create/destroy all) and authentication made with React/Ruby on Rails API.

## .env template
> Create .env at root 

```
DB_USERNAME=postgres
DB_PASSWORD=root
DB_NAME=happy_cat_development
DB_HOST=db
DB_PORT=5432
DB_URL=postgresql://postgres@host.docker.internal:5432/happy_cat_development?encoding=utf8&pool=5&timeout=5000
```

## Run the app
> Requires docker installed and running

```
docker-compose build
docker-compose run api bundle exec rails db:create
docker-compose run api bundle exec rails db:migrate
docker-compose up -d

Open localhost:3000
```

