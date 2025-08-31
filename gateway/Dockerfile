# Stage 1: Build frontend with Bun
FROM oven/bun:1 AS build
WORKDIR /app
COPY phase_1/frontend/package.json phase_1/frontend/bun.lockb ./
RUN bun install
COPY phase_1/frontend ./
RUN bun run build

# Stage 2: Nginx reverse proxy + static hosting
FROM nginx:1.27-alpine
# Install envsubst (in gettext)
RUN apk add --no-cache bash gettext

# Copy nginx template and entrypoint
COPY gateway/nginx.conf.template /etc/nginx/templates/nginx.conf.template
COPY gateway/entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

# Copy frontend build output
COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 8080
ENV CENTRAL_API_URL="https://central_api_url_placeholder" \
    DHB_API_URL="https://dhb_api_url_placeholder" \
    TONIQ_API_URL="https://pharmacy_api_url_placeholder"

ENTRYPOINT ["/entrypoint.sh"]
