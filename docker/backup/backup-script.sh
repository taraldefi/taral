#!/bin/bash

# Wait for PostgreSQL to be ready (optional based on your network setup)
while ! pg_isready -h ${DB_HOST} -p 5432 -U ${DB_USER}; do
  sleep 1
done

pg_dump -h ${DB_HOST} -U ${DB_USER} -w -d ${DB_NAME} > /backups/${DB_NAME}-$(date +"%Y-%m-%d_%H-%M-%S").sql

if [ $? -eq 0 ]; then
  echo "Backup successful."
else
  echo "Backup failed."
fi
