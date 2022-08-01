# Home Library Service with Docker

## Prerequisites

- Git - [Download & Install Git](https://git-scm.com/downloads).
- Node.js - [Download & Install Node.js](https://nodejs.org/en/download/) and the npm package manager.
- Docker Engine - [Download & Install Docker Engine](https://docs.docker.com/engine/)
- Docker Desktop - [Download & Install Docker Desktop (OPTIONAL)](https://www.docker.com/products/docker-desktop/)

## Downloading repository

```
git clone https://github.com/blinkoliver/nodejs2022Q2-service.git

```

## Installing modules

```
npm install
```

## Start application

Create .env file from .env.example file.

To start application run:
```
docker-compose build

docker-compose up
```

for creatin migration (after running db)

```
npm run typeorm:migration
```

## Testing

After application running open new terminal and enter:

```
npm run test
```
