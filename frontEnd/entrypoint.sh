#!/bin/bash

echo "fe entrypoint started"
ls -la
./wait-for-it.sh django:8000
ls -la

nginx -g daemon off
