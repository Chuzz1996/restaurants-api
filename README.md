# Bogotaeats-restaurant-api

## Description

Bogotaeats restaurant api; running at nestjs

## start database

```bash
$ docker-compose up -d
```

## enviroment credentials

```bash
$ PORT=3001
$ MONGO_RESTAURANT_DB='mongodb://mongoDev:Passw0rd@localhost:27017/?authSource=admin'
```

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```
