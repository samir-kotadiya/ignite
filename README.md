# ignite

## Development setup

* Install `NodeJS` [https://nodejs.org/en/](https://nodejs.org/en/). Node version should be` 16.17.0`
* Run `npm i` to install all the dependency

## How to run

```bash
npm start
```

## DB setup 
create `postgres` and restore dump located in gutendex.zip at root level,

update database details in .env or at `src/conf/datasource.ts`

## run test case
```bash
npm run test
```

## Swagger
Swagger file `swagger.yml` you can find it at root level

## DB migration need to be done