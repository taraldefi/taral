## Business API

The business API backend contains functionality for the Taral frontend. 

As development progresses, one can find an insomnia collection in `/insomnia/taral-business-api.json`. This collection can be imported and used to interact with the business api. 

## Comfortable development

```bash
cd standalone/business-api/
cp env-example .env
```

Change `DATABASE_HOST=postgres` to `DATABASE_HOST=localhost`
Change `MAIL_HOST=maildev` to `MAIL_HOST=localhost`

Run additional container:

```bash
docker-compose -f docker-compose.deps.yaml up -d
```

```bash
yarn install

yarn run migration:run

yarn run seed:run

yarn run start:dev
```

## Links

- Swagger: http://localhost:3000/docs
- Adminer (client for DB): http://localhost:8080
- Maildev: http://localhost:1080

## Database utils

Generate migration

```bash
yarn run migration:generate -- CreateNameTable
```

Run migration

```bash
yarn run migration:run
```

Revert migration

```bash
yarn run migration:revert
```

Drop all tables in database

```bash
yarn run schema:drop
```

Run seed

```bash
yarn run seed:run
```