#!/usr/bin/env bash
set -e

./wait-for-it.sh postgres:5432 --timeout=25
npm run migration:run
npm run seed:run
npm run start:prod > /dev/null 2>&1 &
./wait-for-it.sh maildev:1080
./wait-for-it.sh localhost:3000
npm run lint
npm run test:e2e -- --runInBand
