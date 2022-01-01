echo COOKIE_SECRET=$(uuidgen) > .env
echo DB_URL=mongodb://mongodb/cspw2s >> .env

docker-compose up -d