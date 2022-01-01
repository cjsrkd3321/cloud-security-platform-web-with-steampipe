echo COOKIE_SECRET=$(uuidgen) > .env
echo DB_URL=mongodb://mongodb/cspw2s >> .env

docker-compose build --no-cache
docker-compose up -d