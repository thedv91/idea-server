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

```bash
docker run --name idea-dev -v "$PWD":/usr/src/app --link mongo:mongo -w /usr/src/app -p 8081:8081 node:6.10.2-alpine node server.js
```


docker-compose -f docker-compose-dev.yml up