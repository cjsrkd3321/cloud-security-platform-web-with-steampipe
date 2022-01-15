echo COOKIE_SECRET=$(uuidgen) > .env
echo DB_URL=mongodb://mongodb/cspw2s >> .env
echo SP_HOST=steampipe >> .env
echo SP_PASSWORD=$(uuidgen) >> .env
echo SP_TTL=300 >> .env

docker-compose build
docker-compose up -d

