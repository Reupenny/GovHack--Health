# OpenHealth API - Phase 1 Getting Started Guide

A comprehensive health data API system that enables data consolidation from multiple health service providers through a centralized gateway.

## 🏗️ Project Structure

```
phase_1/
├── central_api/          # Centralized API gateway (port 3000)
├── DHB/                  # DHB service provider API (port 3001)
├── api/openapi.yaml      # OpenAPI specification
└── testing/postman/      # Postman collection and environment
```

## 🌐 Architecture Overview

The OpenHealth API system consists of two main components:

### 1. DHB API (Individual Health Service Provider)
- **Port**: 3001
- **Purpose**: Represents a single health service provider (e.g., District Health Board)
- **Features**: Mock patient data, OpenAPI compliant endpoints, built-in documentation
- **Sample Data**: 3 test patients with comprehensive medical histories

### 2. Central API (Aggregation Gateway)
- **Port**: 3000
- **Purpose**: Consolidates data from multiple registered health service providers
- **Key Features**:
  - Service provider registration system
  - Parallel querying of registered providers
  - Data consolidation and deduplication
  - Error handling and timeout management
  - OpenAPI compliant proxy endpoints

### Data Flow
1. Health service providers register themselves with the Central API
2. Central API stores provider URLs in memory
3. When queries come in, Central API forwards them to all registered providers
4. Responses are consolidated, deduplicated, and returned as unified data

## 🚀 Quick Start

### Prerequisites
- Node.js (v18+)
- bun

### Step 1: Install Dependencies

```bash
# Install DHB API dependencies
cd phase_1/DHB
bun install

# Install Central API dependencies
cd ../central_api
bun install
```

### Step 2: Start the Services

**Terminal 1 - Start DHB API:**
```bash
cd phase_1/DHB
bun run dev
```

**Terminal 2 - Start Central API:**
```bash
cd phase_1/central_api
bun run dev
```

You should see:
```
🚀 OpenHealth API running on http://localhost:3001
📚 API Documentation: http://localhost:3001/docs
❤️  Health Check: http://localhost:3001/health

OpenHealth Central API is running on http://localhost:3000
```

### Step 3: Register the DHB Service

Register the DHB API with the Central API:

```bash
curl -X POST http://localhost:3000/register \
  -H "Content-Type: application/json" \
  -d '{
    "providerId": "dhb-auckland", 
    "baseUrl": "http://localhost:3001/api/v1"
  }'
```

Expected response:
```json
{
  "message": "Service provider registered successfully",
  "providerId": "dhb-auckland",
  "totalProviders": 1
}
```

### Step 4: Test the APIs

**Test DHB API directly:**
```bash
curl http://localhost:3001/api/v1/patients/ABC1234
curl http://localhost:3001/api/v1/patients/ABC1234/medications
```

**Test Central API (consolidated data):**
```bash
curl http://localhost:3000/patients/ABC1234
curl http://localhost:3000/patients/ABC1234/medications?current=true&limit=10
```

## 📋 API Endpoints

### Central API (Port 3000)

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/` | API status and info |
| POST | `/register` | Register a service provider |
| GET | `/providers` | List registered providers |
| GET | `/patients/{nhi}` | Get patient information |
| GET | `/patients/{nhi}/medications` | Get patient medications |
| GET | `/patients/{nhi}/blood-tests` | Get blood test results |
| GET | `/patients/{nhi}/documents` | Get patient documents |
| GET | `/patients/{nhi}/documents/{id}` | Get specific document content |

### DHB API (Port 3001)

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/` | API status and sample data |
| GET | `/health` | Health check endpoint |
| GET | `/docs` | Interactive API documentation |
| GET | `/api/v1/patients/{nhi}` | Get patient information |
| GET | `/api/v1/patients/{nhi}/medications` | Get patient medications |
| GET | `/api/v1/patients/{nhi}/blood-tests` | Get blood test results |
| GET | `/api/v1/patients/{nhi}/documents` | Get patient documents |
| GET | `/api/v1/patients/{nhi}/documents/{id}` | Get document content |

## 🧪 Testing with Postman

### Import Collections

1. Open Postman
2. Click **Import** → **Upload Files**
3. Import both files:
   - `phase_1/testing/postman/OpenHealth_API.postman_collection.json`
   - `phase_1/testing/postman/OpenHealth_API.postman_environment.json`
4. Select the "OpenHealth API Environment" from the environment dropdown

### Run Tests

**Individual Tests:**
- Click any request and hit **Send**

**Full Test Suite:**
- Click the collection name
- Click **Run collection**
- Hit **Run OpenHealth API**

Expected results: 13 requests, 40+ assertions, 0 failures

### Key Test Scenarios

The Postman collection includes tests for:
- ✅ Health checks and status endpoints  
- ✅ Patient information retrieval (3 sample patients)
- ✅ Medication queries with filtering
- ✅ Blood test results with date filtering
- ✅ Document listing and content retrieval
- ✅ Error handling (invalid NHI, missing patients)
- ✅ Performance validation (response times < 500ms)

## 👥 Sample Test Data

The system includes 3 test patients:

| NHI | Name | Condition | Use Case |
|-----|------|-----------|----------|
| ABC1234 | John Doe | Extensive medical history | Comprehensive testing |
| DEF5678 | Maria Garcia | Thyroid condition | Medication management |  
| GHI9012 | Dr. Priya Patel | Hypertension | Document workflows |

## 📚 API Documentation

### View OpenAPI Specification

**Interactive Swagger UI:**
- DHB API: http://localhost:3001/docs
- Or view the spec directly: `phase_1/api/openapi.yaml`

**Online Swagger Editor:**
1. Go to https://editor.swagger.io/
2. Copy content from `phase_1/api/openapi.yaml`
3. Paste into the editor for a rich viewing experience

## 🛠️ Key Features

### Service Provider Registration
- Dynamic registration of health service providers
- In-memory storage of provider endpoints
- Support for multiple concurrent providers

### Data Consolidation
- Parallel querying of all registered providers
- Intelligent merging of patient data
- Deduplication based on unique IDs
- Graceful error handling (continues if some providers fail)

### Shared Type System
- Consistent TypeScript types across all services
- Located in `DHB/src/types.ts`
- Ensures API compatibility and data consistency

### Error Handling
- Comprehensive error responses with standard formats
- Request timeouts (5 second default)
- Graceful degradation when providers are unavailable

### Query Parameter Support
- **Medications**: `current=true`, `limit=10`
- **Blood Tests**: `from=2024-01-01`, `to=2024-12-31`, `limit=20`
- **Documents**: `type=lab-result`, `from=2024-01-01`, `to=2024-12-31`

## 🔧 Development Commands

```bash
# Development mode (auto-reload)
bun run dev

# Build for production
bun run build

# Run production build
bun run start
```

## 🐛 Troubleshooting

### Common Issues

**"Connection refused" errors:**
- Ensure both APIs are running on correct ports (3000, 3001)
- Check that registration was successful: `curl http://localhost:3000/providers`

**Empty or incorrect responses:**
- Verify the DHB API is returning data: `curl http://localhost:3001/api/v1/patients/ABC1234`
- Check that the `baseUrl` in registration includes `/api/v1`

**Test failures:**
- Ensure both services are running before running Postman tests
- Verify sample data exists by checking individual endpoints

**Slow responses:**
- Development mode includes TypeScript compilation overhead
- For performance testing, use `bun run build && bun run start`

### Debugging Tips

**Check registered providers:**
```bash
curl http://localhost:3000/providers
```

**View API status:**
```bash
curl http://localhost:3000/
curl http://localhost:3001/
```

**Test health endpoints:**
```bash
curl http://localhost:3001/health
```

## 🚦 Next Steps

1. **Add More Providers**: Register additional health service providers
2. **Data Persistence**: Replace in-memory storage with a database
3. **Authentication**: Add API key or OAuth2 authentication
4. **Rate Limiting**: Implement request rate limiting
5. **Caching**: Add response caching for better performance
6. **Monitoring**: Integrate logging and monitoring solutions

## 📞 Support

For issues or questions:
- Check the individual component READMEs in `central_api/` and `DHB/` directories
- Review the OpenAPI specification in `api/openapi.yaml`
- Use the Postman collection for API testing and exploration

---

**🎉 You're ready to start working with the OpenHealth API system!** The dual-API architecture provides both individual provider functionality and centralized data aggregation, making it perfect for healthcare data integration scenarios.