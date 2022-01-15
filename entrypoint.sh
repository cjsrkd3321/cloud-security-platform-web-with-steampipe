#!/bin/bash

dockerize -wait tcp://steampipe:9193 -timeout 30s
npm start