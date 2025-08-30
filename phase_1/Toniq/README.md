# OpenHealth DHB API

A health service provider API that serves mock patient data and implements the OpenHealth API specification.

## Features

- **Mock Patient Data**: 3 comprehensive test patients with medical histories
- **OpenAPI Compliant**: Implements the complete OpenHealth API specification
- **Interactive Documentation**: Built-in Swagger UI at `/docs`
- **Health Monitoring**: Health check endpoint at `/health`
- **Shared Types**: TypeScript types shared across all health services

## Quick Start

```bash
bun install
bun run dev
```

Open http://localhost:3001

## API Endpoints

### Health Monitoring
- `GET /` - API status and sample data overview
- `GET /health` - Health check endpoint
- `GET /docs` - Interactive API documentation (Swagger UI)

### Patient Data (OpenAPI Compliant)
- `GET /api/v1/patients/{nhi}` - Patient basic information
- `GET /api/v1/patients/{nhi}/medications` - Patient medications
- `GET /api/v1/patients/{nhi}/blood-tests` - Blood test results
- `GET /api/v1/patients/{nhi}/documents` - Health documents
- `GET /api/v1/patients/{nhi}/documents/{documentId}` - Specific document content

## Sample Test Data

| NHI | Name | Condition | Use Case |
|-----|------|-----------|----------|
| ABC1234 | John Doe | Extensive medical history | Comprehensive testing |
| DEF5678 | Maria Garcia | Thyroid condition | Medication management |  
| GHI9012 | Dr. Priya Patel | Hypertension | Document workflows |

## Usage Examples

```bash
# Get patient information
curl http://localhost:3001/api/v1/patients/ABC1234

# Get current medications only
curl http://localhost:3001/api/v1/patients/ABC1234/medications?current=true

# Get blood tests with date filtering
curl http://localhost:3001/api/v1/patients/ABC1234/blood-tests?from=2024-01-01&to=2024-12-31

# Get documents by type
curl http://localhost:3001/api/v1/patients/ABC1234/documents?type=lab-result

# Get specific document content
curl http://localhost:3001/api/v1/patients/ABC1234/documents/doc1
```

## Query Parameters

### Medications
- `current=true` - Filter to current medications only
- `limit=10` - Limit number of results

### Blood Tests
- `from=2024-01-01` - Filter results from date
- `to=2024-12-31` - Filter results to date
- `limit=20` - Limit number of results

### Documents
- `type=lab-result` - Filter by document type
- `from=2024-01-01` - Filter results from date
- `to=2024-12-31` - Filter results to date

## Development Commands

```bash
# Development mode (auto-reload)
bun run dev

# Build for production
bun run build

# Run production build
bun run start
```

## Architecture

This API serves as a standalone health service provider that:
1. Provides mock patient data for testing and development
2. Implements the complete OpenHealth API specification
3. Uses shared TypeScript types defined in `src/types.ts`
4. Includes comprehensive error handling and validation
5. Provides interactive documentation via Swagger UI

## Integration with Central API

This DHB API is designed to work with the OpenHealth Central API:

1. Register this service with the Central API:
   ```bash
   curl -X POST http://localhost:3000/register \
     -H "Content-Type: application/json" \
     -d '{"providerId":"dhb-auckland","baseUrl":"http://localhost:3001/api/v1"}'
   ```

2. The Central API will then proxy requests to this service and consolidate responses with other registered providers.

```
open http://localhost:3000
```
