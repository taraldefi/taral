## Storage API

The storage API application is created for the sole purpose of keeping encrypted files only accessible to participants (stakeholders) and taral.

## Comfortable development

```bash
cd standalone/storage-api/
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

## Tests

```bash
# unit tests
yarn run test

# e2e tests
yarn run test:e2e
```

## Tests in Docker

```bash
docker-compose -f docker-compose.ci.yaml --env-file env-example -p ci up --build --exit-code-from api && docker-compose -p ci rm -svf
```