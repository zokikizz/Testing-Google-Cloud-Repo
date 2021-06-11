#!/bin/bash

# Collect static files
# echo "Collect static files"
# python manage.py collectstatic --noinput

./wait-for-it.sh db:5432

# Apply database migrations
 echo "Apply database migrations"
 python manage.py makemigrations
 python manage.py migrate

# Start server
echo "Starting server"
daphne -b 0.0.0.0 -p 8000 backEnd.asgi:application