echo COOKIE_SECRET=$(uuidgen) > .env
echo DB_URL=mongodb://localhost/cspw2s >> .env
echo SP_HOST=localhost >> .env
echo SP_TTL=300 >> .env

npm install
npm run dev:server

