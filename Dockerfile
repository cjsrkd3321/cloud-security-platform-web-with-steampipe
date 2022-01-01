FROM node

WORKDIR /usr/app

COPY src/ ./src/
COPY babel.config.json ./
COPY package*.json ./
COPY .env ./
RUN npm install

EXPOSE 2000

ENTRYPOINT ["npm", "run", "dev"]