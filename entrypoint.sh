#!/bin/bash

dockerize -wait tcp://steampipe:9193 -timeout 20s
sleep 60 # Wait for install steampipe's plugins
npm start