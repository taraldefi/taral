#!/usr/bin/env bash
set -e

./wait-for-it.sh postgres:5432 --timeout=25
npm run migration:run
npm run seed:run

echo "Starting the server in production mode"

cd dist/standalone/portal-api/src && ls -la

npm run start:prod
