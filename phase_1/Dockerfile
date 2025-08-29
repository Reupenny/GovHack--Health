FROM node:20-alpine

WORKDIR /app

# Install bun using the official installation method for Alpine
RUN apk add --no-cache curl && \
    curl -fsSL https://bun.sh/install | bash && \
    mv /root/.bun/bin/bun /usr/local/bin/

# Copy both services (now relative to phase_1)
COPY central_api ./central_api
COPY DHB ./DHB

# Install dependencies and build both services
WORKDIR /app/central_api
RUN bun install && bun run build

WORKDIR /app/DHB
RUN bun install && bun run build

# Install PM2 globally
WORKDIR /app
RUN npm install -g pm2

# Copy PM2 ecosystem file
COPY ecosystem.config.js .

# Expose both ports
EXPOSE 3000 3001

# Start both services with PM2
CMD ["pm2-runtime", "start", "ecosystem.config.js"]