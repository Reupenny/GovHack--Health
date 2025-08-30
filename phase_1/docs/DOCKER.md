# Docker Deployment Guide

## Quick Start with Docker Compose

Run all 3 services with a single command:

```bash
# From the phase_1 directory
cd phase_1

# Start all services (builds and runs containers)
docker compose up -d

# View logs
docker compose logs -f

# Stop all services
docker compose down
```

## What Gets Started

The docker compose setup runs:

1. **Central API** (Port 3000) - Main aggregation gateway
2. **DHB Service** (Port 3001) - Patient info, blood tests, documents  
3. **Toniq Service** (Port 3002) - Medication provider
4. **Auto-registration** - Automatically registers both providers with Central API

## Testing the Deployment

After `docker compose up -d`, test the services:

```bash
# Check all services are healthy
docker compose ps

# Test Central API
curl http://localhost:3000/

# Test consolidated medication data (from Toniq + DHB)
curl http://localhost:3000/patients/ABC1234/medications

# Test DHB service directly
curl http://localhost:3001/api/v1/patients/ABC1234

# Test Toniq service directly  
curl http://localhost:3002/api/v1/patients/ABC1234/medications
```

## Available Endpoints

- **Central API**: http://localhost:3000
- **DHB Service**: http://localhost:3001
- **Toniq Service**: http://localhost:3002
- **DHB Documentation**: http://localhost:3001/docs
- **Toniq Documentation**: http://localhost:3002/docs

## Management Commands

```bash
# Start services
docker compose up -d

# Stop services
docker compose down

# Rebuild and restart
docker compose up -d --build

# View logs
docker compose logs -f

# View logs for specific service
docker compose logs -f openhealth-api

# Restart services
docker compose restart
```

## Troubleshooting

**Services not starting:**
```bash
# Check service status
docker compose ps

# View detailed logs
docker compose logs
```

**Registration issues:**
```bash
# Manual registration if auto-registration fails
curl -X POST http://localhost:3000/register \
  -H "Content-Type: application/json" \
  -d '{"providerId": "dhb-auckland", "baseUrl": "http://localhost:3001/api/v1"}'

curl -X POST http://localhost:3000/register \
  -H "Content-Type: application/json" \
  -d '{"providerId": "toniq-medications", "baseUrl": "http://localhost:3002/api/v1"}'
```

**Check registered providers:**
```bash
curl http://localhost:3000/providers
```