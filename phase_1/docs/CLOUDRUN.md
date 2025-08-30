# Google Cloud Run Setup

## Prerequisites

1. Install Google Cloud CLI: https://cloud.google.com/sdk/docs/install
2. Create Google Cloud project or use existing one
3. Enable billing on your project

## Quick Setup

```bash
# Login to Google Cloud
gcloud auth login

# Set your project ID
export PROJECT_ID="your-project-id"
gcloud config set project $PROJECT_ID

# Enable required APIs (done automatically by deploy.sh)
gcloud services enable run.googleapis.com
gcloud services enable cloudbuild.googleapis.com
```

## Deployment Options

### Option 1: Simple Deploy (Recommended)

```bash
bun run deploy:gcloud
```

### Option 2: Full Deploy Script

```bash
bun run deploy
```

### Option 3: Manual Steps

```bash
# Build and deploy
gcloud run deploy openhealth-services \
  --source . \
  --region us-central1 \
  --allow-unauthenticated \
  --port 3000 \
  --min-instances 0 \
  --max-instances 10
```

## Key Features

- **Scale to Zero**: No cost when idle
- **Auto-scaling**: 0-10 instances based on traffic
- **Container**: Uses your Docker setup with PM2
- **Multi-service**: Both APIs in one container

## After Deployment

- Service URL will be provided
- Central API accessible at: `https://your-service-url/`
- DHB API accessible at: `https://your-service-url/` (internal port routing)

## Cost

- **$0 when idle** (scale to zero)
- ~$0.00002400 per request when active
- Much cheaper than always-on services

