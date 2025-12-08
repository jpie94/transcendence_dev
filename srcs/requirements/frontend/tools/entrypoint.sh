#!/bin/sh
set -e

if [ "$MODE" = "prod" ]; then
    # cp -r /app/dist/* /var/www/html/
    exec gosu www-data nginx -g 'daemon off;'
else
    exec supervisord -n
fi


# exec "$@"