# OpenHealth Google Cloud Run Deployment

This repository contains the Google Cloud Run deployment configuration for the OpenHealth microservices with **true scale-to-zero** capabilities.

 ### [Website](https://reupenny.github.io/GovHack--Health/)
 ### [GovHack Project Page](https://hackerspace.govhack.org/projects/openhealth_api)

## Architecture

- **Central API** (port 3000): Aggregates data from multiple DHB providers
- **DHB API** (port 3001): Mock DHB provider with sample health data  
- **Google Cloud Run**: Serverless container platform with scale-to-zero
- **Single Container**: Both services managed by PM2 in one container

## Project Structure

```
/
├── phase_1/              # Main deployment directory
│   ├── central_api/      # Central aggregation service
│   ├── DHB/             # Mock DHB provider service
│   ├── Dockerfile       # Multi-service container
│   ├── package.json     # Deployment scripts
│   └── deploy.sh        # Deployment automation
├── README.md
├── .gitignore
└── AGENTS.md
```

## Prerequisites

- Google Cloud CLI installed: https://cloud.google.com/sdk/docs/install
- Google Cloud project with billing enabled
- Docker (for local testing)

## Quick Start

```bash
# Login and set project
gcloud auth login
export PROJECT_ID="your-project-id"
gcloud config set project $PROJECT_ID

# Deploy from root (commands redirect to phase_1)
npm run deploy:gcloud
```

## Local Development

```bash
# Build and run locally (from root)
npm run build
npm run dev

# Or work directly in phase_1
cd phase_1
bun run build
bun run dev
```

This runs both services locally:
- Central API: http://localhost:3000
- DHB API: http://localhost:3001

## Local Build Alternative with Docker Desktop
```bash
# Build and run locally all APIs
cd phase_1
npm run build
docker compose up -d --build
```
```bash
# To remove Docker stack
docker compose down
```

## Deployment Options

### 1. Quick Deploy (Recommended)
```bash
npm run deploy:gcloud
```

### 2. Full Deploy Script  
```bash
npm run deploy
```

### 3. From phase_1 directory
```bash
cd phase_1
bun run deploy:gcloud
```

## Key Benefits

- **💰 $0 when idle** - True scale-to-zero (unlike AWS App Runner)
- **⚡ Fast cold starts** - Usually < 1 second
- **📈 Auto-scaling** - 0 to 10 instances based on traffic
- **🔧 Same Docker setup** - Uses existing Dockerfile + PM2
- **🌍 Global CDN** - Built-in edge caching

## Services

### Central API (`central_api`)
- Aggregates health data from multiple providers
- Provides unified patient information endpoints
- Service discovery and provider registration

### DHB API (`DHB`)
- Mock District Health Board provider
- Sample patient data for testing
- Endpoints for patients, medications, blood tests, and documents

## Configuration

- **CPU**: 1 vCPU
- **Memory**: 512Mi
- **Scaling**: 0-10 instances
- **Concurrency**: 80 requests per instance
- **Timeout**: 300 seconds

## Testing

Use the sample NHI numbers provided in the DHB API documentation:
- `ABC1234` - John Doe
- `DEF5678` - Maria Garcia  
- `GHI9012` - Dr. Priya Patel

## Cost Comparison

| Platform | Idle Cost | Active Cost | Scale-to-Zero |
|----------|-----------|-------------|---------------|
| Google Cloud Run | $0 | ~$0.000024/request | ✅ Yes |
| AWS App Runner | ~$10/month | Higher | ❌ No |

Perfect for hackathons and demos! 🚀
