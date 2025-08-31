#!/usr/bin/env sh
set -e
: "${API_BASE_URL:=http://localhost:3000}";
: "${DHB_API_BASE_URL:=http://localhost:3001}";
# Generate runtime-config.js from template
if [ -f /usr/share/nginx/html/runtime-config.template.js ]; then
  sed \
    -e "s|{{API_BASE_URL}}|${API_BASE_URL}|g" \
    -e "s|{{DHB_API_BASE_URL}}|${DHB_API_BASE_URL}|g" \
    /usr/share/nginx/html/runtime-config.template.js > /usr/share/nginx/html/runtime-config.js
fi
exec "$@"
