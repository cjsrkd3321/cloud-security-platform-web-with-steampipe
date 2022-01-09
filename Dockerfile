FROM node
LABEL email="7424069@gmail.com"
LABEL name="cjsrkd3321"

WORKDIR /usr/app

COPY src/ ./src/
COPY package*.json ./
COPY babel.config.json ./
COPY webpack.config.js ./
COPY .env ./
RUN npm install

RUN npm run build

EXPOSE 2000

# dockerize
RUN apt-get update && apt-get install -y wget

ENV DOCKERIZE_VERSION v0.6.1
RUN wget https://github.com/jwilder/dockerize/releases/download/$DOCKERIZE_VERSION/dockerize-linux-amd64-$DOCKERIZE_VERSION.tar.gz \
    && tar -C /usr/local/bin -xzvf dockerize-linux-amd64-$DOCKERIZE_VERSION.tar.gz \
    && rm dockerize-linux-amd64-$DOCKERIZE_VERSION.tar.gz

ENTRYPOINT ["dockerize", "-wait", "tcp://steampipe:9193", "-timeout", "20s"]
CMD ["npm", "start"]