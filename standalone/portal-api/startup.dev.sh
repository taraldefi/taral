#!/usr/bin/env bash
set -e

./wait-for-it.sh postgres:5432 --timeout=25
npm run migration:run
npm run seed:run
npm run start:dev
