#!/usr/bin/env sh
set -e
: "${CENTRAL_API_URL:=https://central_api_url_placeholder}";
: "${DHB_API_URL:=https://dhb_api_url_placeholder}";
: "${TONIQ_API_URL:=https://pharmacy_api_url_placeholder}";

# Substitute env vars into nginx.conf.template
envsubst '${CENTRAL_API_URL} ${DHB_API_URL} ${TONIQ_API_URL}' < /etc/nginx/templates/nginx.conf.template > /etc/nginx/nginx.conf

# Generate runtime-config.js for frontend (served at root)
cat > /usr/share/nginx/html/runtime-config.js <<EOF
window.__CONFIG__ = {
  API_BASE_URL: '/api',
  DHB_API_BASE_URL: '/dhb',
  PHARMACY_API_BASE_URL: '/pharmacy'
};
EOF

exec nginx -g 'daemon off;'
