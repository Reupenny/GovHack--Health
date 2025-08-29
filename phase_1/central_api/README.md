# OpenHealth Central API

A centralized API gateway that aggregates health data from multiple service providers.

## Features

- **Service Provider Registration**: Register multiple health data providers
- **Data Consolidation**: Intelligently merges responses from multiple providers
- **OpenAPI Compliant**: Implements the complete OpenHealth API specification
- **Shared Types**: Uses TypeScript types shared across all health services

## Quick Start

```bash
bun install
bun run dev
```

Open http://localhost:3000

## API Endpoints

### Registration
- `POST /register` - Register a service provider
- `GET /providers` - List registered providers

### Health Data (OpenAPI Compliant)
- `GET /patients/{nhi}` - Patient basic information
- `GET /patients/{nhi}/medications` - Patient medications
- `GET /patients/{nhi}/blood-tests` - Blood test results
- `GET /patients/{nhi}/documents` - Health documents
- `GET /patients/{nhi}/documents/{documentId}` - Specific document content

## Usage Example

```bash
# Register a service provider
curl -X POST http://localhost:3000/register \
  -H "Content-Type: application/json" \
  -d '{"providerId":"dhb-auckland","baseUrl":"https://api.dhb-auckland.nz"}'

# Query consolidated patient data
curl http://localhost:3000/patients/ABC1234
curl http://localhost:3000/patients/ABC1234/medications?current=true&limit=10
```

## Architecture

The API acts as a centralized proxy that:
1. Stores service provider URLs in memory
2. Distributes requests to all registered providers in parallel
3. Consolidates and deduplicates responses
4. Handles errors gracefully (continues working if some providers are down)

## Shared Types

This API uses shared TypeScript types from `../DHB/src/types.ts` to ensure consistency across all health services.
