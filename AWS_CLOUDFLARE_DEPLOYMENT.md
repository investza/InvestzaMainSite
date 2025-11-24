# AWS + Cloudflare Deployment Guide

## Architecture Overview

```
User → Cloudflare CDN → AWS S3 (Static Site) → CloudFront (Optional)
                      ↓
                  Backend APIs (EC2/Lambda/ECS)
```

---

## Part 1: Deploy Frontend to AWS S3 + Cloudflare

### Prerequisites
- AWS Account
- Cloudflare Account
- Domain name added to Cloudflare
- AWS CLI installed (optional but recommended)

---

## Step 1: Build Your React App

```bash
cd my-app
npm run build
```

This creates a `build/` folder with optimized production files.

---

## Step 2: Create S3 Bucket

### Via AWS Console:

1. **Go to S3 Console**
   - https://s3.console.aws.amazon.com/

2. **Create Bucket**
   - Click "Create bucket"
   - Bucket name: `investza-frontend` (must be globally unique)
   - Region: Choose closest to your users (e.g., `ap-south-1` for India)
   - **Uncheck** "Block all public access"
   - Acknowledge the warning
   - Click "Create bucket"

3. **Enable Static Website Hosting**
   - Click on your bucket
   - Go to "Properties" tab
   - Scroll to "Static website hosting"
   - Click "Edit"
   - Enable: "Static website hosting"
   - Index document: `index.html`
   - Error document: `index.html` (for React Router)
   - Save changes
   - **Note the endpoint URL** (e.g., `http://investza-frontend.s3-website.ap-south-1.amazonaws.com`)

4. **Set Bucket Policy**
   - Go to "Permissions" tab
   - Click "Bucket Policy"
   - Paste this policy (replace `investza-frontend` with your bucket name):

```json
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Sid": "PublicReadGetObject",
            "Effect": "Allow",
            "Principal": "*",
            "Action": "s3:GetObject",
            "Resource": "arn:aws:s3:::investza-frontend/*"
        }
    ]
}
```

   - Save changes

---

## Step 3: Upload Build Files to S3

### Option A: Via AWS Console (Easy)

1. Go to your bucket
2. Click "Upload"
3. Drag and drop ALL files from `my-app/build/` folder
4. Click "Upload"
5. Wait for upload to complete

### Option B: Via AWS CLI (Faster, Recommended)

```bash
# Install AWS CLI if not already installed
# macOS: brew install awscli
# Configure AWS CLI (one-time setup)
aws configure
# Enter your AWS Access Key ID
# Enter your AWS Secret Access Key
# Default region: ap-south-1 (or your chosen region)
# Default output format: json

# Upload files
cd my-app
aws s3 sync build/ s3://investza-frontend --delete

# Set proper content types for videos
aws s3 cp build/ s3://investza-frontend --recursive \
  --exclude "*" --include "*.mp4" \
  --content-type "video/mp4" \
  --metadata-directive REPLACE
```

### Test S3 Website
Visit your S3 website endpoint (from Step 2.3) to verify it works.

---

## Step 4: Configure Cloudflare

### 1. Add DNS Records

Go to Cloudflare Dashboard → Your Domain → DNS

**For root domain (investza.com):**
```
Type: CNAME
Name: @
Target: investza-frontend.s3-website.ap-south-1.amazonaws.com
Proxy status: Proxied (orange cloud)
TTL: Auto
```

**For www subdomain:**
```
Type: CNAME
Name: www
Target: investza-frontend.s3-website.ap-south-1.amazonaws.com
Proxy status: Proxied (orange cloud)
TTL: Auto
```

### 2. Configure SSL/TLS

- Go to SSL/TLS → Overview
- Set encryption mode to: **Full** (not Full Strict, since S3 doesn't have custom SSL)

### 3. Configure Page Rules (Important for React Router)

Go to Rules → Page Rules → Create Page Rule

**Rule 1: Redirect www to non-www (optional)**
```
URL: www.investza.com/*
Setting: Forwarding URL (301 - Permanent Redirect)
Destination: https://investza.com/$1
```

**Rule 2: Cache Everything**
```
URL: investza.com/*
Settings:
  - Cache Level: Cache Everything
  - Edge Cache TTL: 1 month
  - Browser Cache TTL: 4 hours
```

### 4. Configure Caching

Go to Caching → Configuration

- Caching Level: Standard
- Browser Cache TTL: 4 hours
- Always Online: On

### 5. Optimize Performance

**Go to Speed → Optimization**
- Auto Minify: Enable CSS, JavaScript, HTML
- Brotli: On
- Early Hints: On
- Rocket Loader: Off (can break React)

**Go to Speed → Image Optimization**
- Polish: Lossless
- Mirage: On
- WebP: On

---

## Step 5: Test Your Deployment

1. Visit `https://investza.com`
2. Test all pages
3. Check browser console for errors
4. Test on mobile
5. Verify videos play correctly

---

## Part 2: Continuous Deployment Setup

### Option A: GitHub Actions (Automated)

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to AWS S3

on:
  push:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v3
    
    - name: Setup Node.js
      uses: actions/setup-node@v3
      with:
        node-version: '18'
        
    - name: Install dependencies
      run: |
        cd my-app
        npm ci
        
    - name: Build
      run: |
        cd my-app
        npm run build
        
    - name: Configure AWS credentials
      uses: aws-actions/configure-aws-credentials@v2
      with:
        aws-access-key-id: ${{ secrets.AWS_ACCESS_KEY_ID }}
        aws-secret-access-key: ${{ secrets.AWS_SECRET_ACCESS_KEY }}
        aws-region: ap-south-1
        
    - name: Deploy to S3
      run: |
        cd my-app
        aws s3 sync build/ s3://investza-frontend --delete
        
    - name: Invalidate Cloudflare Cache
      run: |
        curl -X POST "https://api.cloudflare.com/client/v4/zones/${{ secrets.CLOUDFLARE_ZONE_ID }}/purge_cache" \
          -H "Authorization: Bearer ${{ secrets.CLOUDFLARE_API_TOKEN }}" \
          -H "Content-Type: application/json" \
          --data '{"purge_everything":true}'
```

**Setup GitHub Secrets:**
1. Go to GitHub repo → Settings → Secrets and variables → Actions
2. Add secrets:
   - `AWS_ACCESS_KEY_ID`
   - `AWS_SECRET_ACCESS_KEY`
   - `CLOUDFLARE_ZONE_ID` (from Cloudflare dashboard)
   - `CLOUDFLARE_API_TOKEN` (create in Cloudflare → My Profile → API Tokens)

### Option B: Manual Deployment Script

Create `deploy.sh` in project root:

```bash
#!/bin/bash

echo "🚀 Starting deployment..."

# Build
echo "📦 Building React app..."
cd my-app
npm run build

# Upload to S3
echo "☁️  Uploading to S3..."
aws s3 sync build/ s3://investza-frontend --delete

# Purge Cloudflare cache
echo "🔄 Purging Cloudflare cache..."
curl -X POST "https://api.cloudflare.com/client/v4/zones/YOUR_ZONE_ID/purge_cache" \
  -H "Authorization: Bearer YOUR_API_TOKEN" \
  -H "Content-Type: application/json" \
  --data '{"purge_everything":true}'

echo "✅ Deployment complete!"
echo "🌐 Visit: https://investza.com"
```

Make it executable:
```bash
chmod +x deploy.sh
```

Deploy with:
```bash
./deploy.sh
```

---

## Part 3: Backend Deployment on AWS

### Option 1: AWS EC2 (Traditional)

**For Node.js Backend:**

1. **Launch EC2 Instance**
   - AMI: Ubuntu 22.04 LTS
   - Instance type: t3.micro (free tier) or t3.small
   - Security group: Allow ports 22 (SSH), 80 (HTTP), 443 (HTTPS), 5000 (Node.js)

2. **Connect and Setup**
```bash
ssh -i your-key.pem ubuntu@your-ec2-ip

# Install Node.js
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Install PM2
sudo npm install -g pm2

# Clone your repo
git clone https://github.com/investza/landing-react.git
cd landing-react/server

# Install dependencies
npm install

# Setup environment variables
nano .env
# Add your production variables

# Start with PM2
pm2 start server.js --name investza-backend
pm2 startup
pm2 save
```

3. **Setup Nginx Reverse Proxy**
```bash
sudo apt install nginx

# Create Nginx config
sudo nano /etc/nginx/sites-available/investza-backend

# Add this configuration:
server {
    listen 80;
    server_name api.investza.com;

    location / {
        proxy_pass http://localhost:5000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}

# Enable site
sudo ln -s /etc/nginx/sites-available/investza-backend /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

4. **Setup SSL with Certbot**
```bash
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d api.investza.com
```

**For Spring Boot Backend:**

Similar process but:
- Install Java 21: `sudo apt install openjdk-21-jdk`
- Build: `./mvnw clean package`
- Run: `java -jar target/demo-0.0.1-SNAPSHOT.jar`
- Or use PM2: `pm2 start "java -jar target/demo-0.0.1-SNAPSHOT.jar" --name callschedule-backend`

### Option 2: AWS Elastic Beanstalk (Easier)

1. **Install EB CLI**
```bash
pip install awsebcli
```

2. **Initialize and Deploy**
```bash
cd server
eb init -p node.js-18 investza-backend --region ap-south-1
eb create investza-backend-prod
eb deploy
```

3. **Configure Environment Variables**
```bash
eb setenv NODE_ENV=production MONGODB_URI=your-mongo-uri
```

### Option 3: AWS Lambda + API Gateway (Serverless)

Best for low traffic, cost-effective. Requires code modifications.

---

## Part 4: Database Setup

### MongoDB Atlas (Recommended)
1. Go to mongodb.com/cloud/atlas
2. Create free cluster
3. Whitelist EC2 IP or use 0.0.0.0/0 (all IPs)
4. Get connection string
5. Update backend .env

### AWS DocumentDB (AWS-native MongoDB)
More expensive but fully managed by AWS.

---

## Part 5: Connect Frontend to Backend

### 1. Update Environment Variables

**In your local `.env.production`:**
```env
REACT_APP_NODE_BACKEND_URL=https://api.investza.com
REACT_APP_CALLSCHEDULE_BACKEND_URL=https://schedule-api.investza.com
```

### 2. Update API Files

**`my-app/src/api/flowApi.js`:**
```javascript
const API = process.env.REACT_APP_CALLSCHEDULE_BACKEND_URL 
  ? `${process.env.REACT_APP_CALLSCHEDULE_BACKEND_URL}/api/flow`
  : "http://localhost:8080/api/flow";
```

### 3. Rebuild and Redeploy
```bash
cd my-app
npm run build
aws s3 sync build/ s3://investza-frontend --delete
```

### 4. Configure CORS on Backend

**Node.js (server/server.js):**
```javascript
app.use(cors({
  origin: ['https://investza.com', 'https://www.investza.com'],
  credentials: true
}));
```

**Spring Boot (already configured, just update allowed origins)**

---

## Cost Estimate (Monthly)

### Minimal Setup:
- S3 Storage (5GB): ~$0.12
- S3 Requests: ~$0.50
- Data Transfer: ~$1-5 (Cloudflare reduces this)
- EC2 t3.micro: ~$8.50 (or free tier for 12 months)
- **Total: ~$10-15/month**

### With Cloudflare:
- Cloudflare Free Plan: $0
- Bandwidth savings: Significant (Cloudflare caches everything)

---

## Monitoring & Maintenance

### CloudWatch (AWS)
- Monitor EC2 CPU/Memory
- Set up alarms for high usage
- View application logs

### Cloudflare Analytics
- View traffic patterns
- Monitor cache hit ratio
- Check security threats

---

## Backup Strategy

### Automated S3 Backups
```bash
# Create backup script
aws s3 sync s3://investza-frontend s3://investza-frontend-backup-$(date +%Y%m%d)
```

### Database Backups
- MongoDB Atlas: Automatic backups included
- EC2: Use AWS Backup service

---

## Security Checklist

- ✅ Enable Cloudflare WAF (Web Application Firewall)
- ✅ Enable DDoS protection (included in Cloudflare)
- ✅ Use HTTPS everywhere
- ✅ Restrict S3 bucket access
- ✅ Use IAM roles with minimal permissions
- ✅ Enable CloudWatch logging
- ✅ Regular security updates on EC2
- ✅ Use environment variables for secrets
- ✅ Enable Cloudflare Bot Fight Mode

---

## Troubleshooting

### Site Not Loading
- Check Cloudflare DNS propagation (can take 5-60 min)
- Verify S3 bucket policy is public
- Check Cloudflare SSL mode (should be "Full")

### 404 on Page Refresh
- Ensure S3 error document is set to `index.html`
- Check Cloudflare page rules

### Slow Loading
- Enable Cloudflare caching
- Compress videos further
- Use Cloudflare image optimization

### API Calls Failing
- Check CORS configuration
- Verify backend is running
- Check security group rules on EC2

---

## Quick Commands Reference

```bash
# Build and deploy
cd my-app && npm run build
aws s3 sync build/ s3://investza-frontend --delete

# Purge Cloudflare cache
curl -X POST "https://api.cloudflare.com/client/v4/zones/ZONE_ID/purge_cache" \
  -H "Authorization: Bearer API_TOKEN" \
  -H "Content-Type: application/json" \
  --data '{"purge_everything":true}'

# Check backend status
pm2 status
pm2 logs investza-backend

# Restart backend
pm2 restart investza-backend
```

---

## Next Steps

1. ✅ Create AWS account
2. ✅ Create S3 bucket
3. ✅ Build and upload React app
4. ✅ Configure Cloudflare DNS
5. ✅ Test frontend
6. ⏳ Deploy backends to EC2
7. ⏳ Connect APIs
8. ⏳ Final testing
9. 🚀 Launch!

---

## Support Resources

- AWS Documentation: https://docs.aws.amazon.com
- Cloudflare Docs: https://developers.cloudflare.com
- AWS Free Tier: https://aws.amazon.com/free
