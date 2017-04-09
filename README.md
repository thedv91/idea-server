### Nodejs - ES6

### TL;DR
```shell
yarn install
```
### Run development
```shell
yarn watch
```
### Run production
```shell
yarn prod
```
### Run with pm2
```shell
pm2 start server.js
```

### Generate docs
```shell
yarn doc
```
### Run development Docker
```bash
docker-compose -f docker-compose-development.yml up
```

### Build with Docker
```{r, engine='bash'}
docker build -t idea .
docker run --name db -p 27017:27017 -d mongo
docker run --name idea-dev --link db:db -p 8000:8000 -d idea
```