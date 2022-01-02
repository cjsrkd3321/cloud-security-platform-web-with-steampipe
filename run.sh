echo COOKIE_SECRET=$(uuidgen) > .env
echo DB_URL=mongodb://mongodb/cspw2s >> .env
echo SP_HOST=steampipe >> .env
echo SP_PASSWORD=$(uuidgen) >> .env

docker-compose build --no-cache
docker-compose up -d

docker exec -it steampipe steampipe plugin install steampipe && docker exec -it steampipe steampipe plugin install aws

