# README

Simple CRUD for cats, cat's weight history (create/destroy all) and authentication functionality made with React/Ruby on Rails API.

At root : rails s -p 3001

/client : npm start

Run migrations : rails db:create

Docker: docker-compose up -d

.env :

DB_USERNAME=postgres
DB_PASSWORD=root
DB_NAME=happy_cat_development
DB_HOST=db
DB_PORT=5432
DB_URL: postgresql://postgres@host.docker.internal:5432/happy_cat_development?encoding=utf8&pool=5&timeout=5000