#!/bin/bash

# AWS + Cloudflare Deployment Script
# Usage: ./deploy-aws.sh

set -e

echo "🚀 Investza AWS Deployment Script"
echo "=================================="
echo ""

# Configuration
BUCKET_NAME="investza-frontend"
REGION="ap-south-1"
CLOUDFLARE_ZONE_ID=""  # Add your Cloudflare Zone ID
CLOUDFLARE_API_TOKEN=""  # Add your Cloudflare API Token

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check if AWS CLI is installed
if ! command -v aws &> /dev/null; then
    echo -e "${RED}❌ AWS CLI not found. Please install it first.${NC}"
    echo "Install: brew install awscli"
    exit 1
fi

# Check if AWS is configured
if ! aws sts get-caller-identity &> /dev/null; then
    echo -e "${RED}❌ AWS CLI not configured. Please run 'aws configure' first.${NC}"
    exit 1
fi

echo -e "${GREEN}✓ AWS CLI configured${NC}"
echo ""

# Build React app
echo "📦 Building React application..."
cd my-app

if [ ! -d "node_modules" ]; then
    echo "Installing dependencies..."
    npm install
fi

npm run build

if [ ! -d "build" ]; then
    echo -e "${RED}❌ Build failed. No build directory found.${NC}"
    exit 1
fi

echo -e "${GREEN}✓ Build successful${NC}"
echo ""

# Upload to S3
echo "☁️  Uploading to S3 bucket: $BUCKET_NAME..."

# Sync files
aws s3 sync build/ s3://$BUCKET_NAME \
    --region $REGION \
    --delete \
    --cache-control "public, max-age=31536000" \
    --exclude "*.html" \
    --exclude "service-worker.js"

# Upload HTML files with no-cache
aws s3 sync build/ s3://$BUCKET_NAME \
    --region $REGION \
    --cache-control "no-cache" \
    --exclude "*" \
    --include "*.html" \
    --include "service-worker.js"

# Set correct content-type for videos
echo "🎥 Setting content-type for videos..."
aws s3 cp s3://$BUCKET_NAME/ s3://$BUCKET_NAME/ \
    --recursive \
    --exclude "*" \
    --include "*.mp4" \
    --content-type "video/mp4" \
    --metadata-directive REPLACE \
    --region $REGION

echo -e "${GREEN}✓ Upload complete${NC}"
echo ""

# Purge Cloudflare cache (if configured)
if [ -n "$CLOUDFLARE_ZONE_ID" ] && [ -n "$CLOUDFLARE_API_TOKEN" ]; then
    echo "🔄 Purging Cloudflare cache..."
    
    RESPONSE=$(curl -s -X POST "https://api.cloudflare.com/client/v4/zones/$CLOUDFLARE_ZONE_ID/purge_cache" \
        -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
        -H "Content-Type: application/json" \
        --data '{"purge_everything":true}')
    
    if echo "$RESPONSE" | grep -q '"success":true'; then
        echo -e "${GREEN}✓ Cloudflare cache purged${NC}"
    else
        echo -e "${YELLOW}⚠ Cloudflare cache purge failed${NC}"
        echo "$RESPONSE"
    fi
else
    echo -e "${YELLOW}⚠ Cloudflare credentials not configured. Skipping cache purge.${NC}"
    echo "Add CLOUDFLARE_ZONE_ID and CLOUDFLARE_API_TOKEN to this script."
fi

echo ""
echo -e "${GREEN}✅ Deployment complete!${NC}"
echo ""
echo "🌐 Your site should be live at:"
echo "   S3: http://$BUCKET_NAME.s3-website.$REGION.amazonaws.com"
echo "   Cloudflare: https://investza.com"
echo ""
echo "📊 View deployment:"
echo "   AWS S3: https://s3.console.aws.amazon.com/s3/buckets/$BUCKET_NAME"
echo "   Cloudflare: https://dash.cloudflare.com"
echo ""
