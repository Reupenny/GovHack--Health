FROM oven/bun:1.1-alpine AS base

WORKDIR /app

# Copy all services including frontend
COPY central_api ./central_api
COPY DHB ./DHB
COPY Toniq ./Toniq
COPY frontend ./frontend

# Install dependencies and build all services
WORKDIR /app/central_api
RUN bun install && bun run build

WORKDIR /app/DHB
RUN bun install && bun run build

WORKDIR /app/Toniq
RUN bun install && bun run build

WORKDIR /app/frontend
# Set React environment variables for build
ENV REACT_APP_API_URL=http://localhost:3000
ENV REACT_APP_DHB_API_URL=http://localhost:3001
RUN bun install && bun run build

# Switch to Node.js for PM2 runtime
FROM node:20-alpine AS runtime

WORKDIR /app

# Install PM2 globally and wget for health checks
RUN npm install -g pm2 && apk add --no-cache wget

# Copy built applications from build stage
COPY --from=base /app/central_api/dist ./central_api/dist
COPY --from=base /app/central_api/node_modules ./central_api/node_modules
COPY --from=base /app/central_api/package.json ./central_api/

COPY --from=base /app/DHB/dist ./DHB/dist
COPY --from=base /app/DHB/node_modules ./DHB/node_modules
COPY --from=base /app/DHB/package.json ./DHB/

COPY --from=base /app/Toniq/dist ./Toniq/dist
COPY --from=base /app/Toniq/node_modules ./Toniq/node_modules
COPY --from=base /app/Toniq/package.json ./Toniq/

COPY --from=base /app/frontend/dist ./frontend/dist
COPY --from=base /app/frontend/node_modules ./frontend/node_modules
COPY --from=base /app/frontend/package.json ./frontend/

# Copy PM2 ecosystem file
COPY ecosystem.config.js .

# Expose port 8080 for Cloud Run and internal ports
EXPOSE 8080 3000 3001 3003

# Start all services with PM2
CMD ["pm2-runtime", "start", "ecosystem.config.js"]
