#!/bin/sh
set -e

if [ -f /app/tmp/pids/server.pid ]; then
  rm /app/tmp/pids/server.pid
fi

rake db:create
rake db:migrate

exec bundle exec "$@"
