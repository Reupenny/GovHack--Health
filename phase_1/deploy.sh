#!/bin/bash

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check if gcloud is installed
if ! command -v gcloud &> /dev/null; then
    echo -e "${RED}Error: Google Cloud CLI (gcloud) is not installed${NC}"
    echo "Install it from: https://cloud.google.com/sdk/docs/install"
    exit 1
fi

# Check if PROJECT_ID is set
if [ -z "$PROJECT_ID" ]; then
    echo -e "${YELLOW}PROJECT_ID not set. Getting from gcloud config...${NC}"
    PROJECT_ID=$(gcloud config get-value project)
    if [ -z "$PROJECT_ID" ]; then
        echo -e "${RED}Error: No Google Cloud project configured${NC}"
        echo "Run: gcloud config set project YOUR_PROJECT_ID"
        exit 1
    fi
fi

echo -e "${GREEN}Deploying to Google Cloud Run...${NC}"
echo "Project: $PROJECT_ID"

# Enable required APIs
echo -e "${YELLOW}Enabling required APIs...${NC}"
gcloud services enable run.googleapis.com
gcloud services enable cloudbuild.googleapis.com

# Build and submit to Google Container Registry
echo -e "${YELLOW}Building Docker image...${NC}"
gcloud builds submit --tag gcr.io/$PROJECT_ID/openhealth-services

# Replace PROJECT_ID in cloudrun.yaml
sed "s/PROJECT_ID/$PROJECT_ID/g" cloudrun.yaml > cloudrun-deploy.yaml

# Deploy to Cloud Run
echo -e "${YELLOW}Deploying to Cloud Run...${NC}"
gcloud run services replace cloudrun-deploy.yaml --region=us-central1

# Get service URL
SERVICE_URL=$(gcloud run services describe openhealth-services --region=us-central1 --format="value(status.url)")

echo -e "${GREEN}Deployment successful!${NC}"
echo "Service URL: $SERVICE_URL"
echo "Central API: $SERVICE_URL (port 3000)"
echo "DHB API: $SERVICE_URL:3001 (note: Cloud Run only exposes one port, DHB accessible internally)"

# Clean up temporary file
rm cloudrun-deploy.yaml

echo -e "${GREEN}Done!${NC}"