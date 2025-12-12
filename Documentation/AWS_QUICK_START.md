# AWS + Cloudflare Quick Start

## Prerequisites Setup (One-time)

### 1. Install AWS CLI
```bash
brew install awscli
```

### 2. Configure AWS CLI
```bash
aws configure
```
Enter:
- AWS Access Key ID: (from AWS IAM)
- AWS Secret Access Key: (from AWS IAM)
- Default region: `ap-south-1` (Mumbai) or your preferred region
- Default output format: `json`

### 3. Get AWS Credentials
1. Go to AWS Console → IAM
2. Create new user: `investza-deployer`
3. Attach policy: `AmazonS3FullAccess`
4. Create access key
5. Save Access Key ID and Secret Access Key

---

## Deploy Frontend (15 minutes)

### Step 1: Create S3 Bucket (AWS Console)

1. Go to https://s3.console.aws.amazon.com/
2. Click "Create bucket"
3. Settings:
   - Name: `investza-frontend` (must be unique globally)
   - Region: `ap-south-1` (Mumbai)
   - **Uncheck** "Block all public access"
   - Click "Create bucket"

### Step 2: Enable Static Website Hosting

1. Click on your bucket
2. Properties tab → Static website hosting → Edit
3. Enable it
4. Index document: `index.html`
5. Error document: `index.html`
6. Save

### Step 3: Set Bucket Policy

1. Permissions tab → Bucket Policy → Edit
2. Paste (replace bucket name):

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

### Step 4: Build and Deploy

```bash
# Build
cd my-app
npm run build

# Deploy
aws s3 sync build/ s3://investza-frontend --delete

# Or use the script
cd ..
./deploy-aws.sh
```

### Step 5: Get S3 Website URL

From Properties tab → Static website hosting
Example: `http://investza-frontend.s3-website.ap-south-1.amazonaws.com`

Test this URL first!

---

## Configure Cloudflare (10 minutes)

### Step 1: Add DNS Records

Cloudflare Dashboard → Your Domain → DNS → Add record

**Record 1 (Root domain):**
```
Type: CNAME
Name: @
Target: investza-frontend.s3-website.ap-south-1.amazonaws.com
Proxy: ON (orange cloud)
```

**Record 2 (www):**
```
Type: CNAME
Name: www
Target: investza-frontend.s3-website.ap-south-1.amazonaws.com
Proxy: ON (orange cloud)
```

### Step 2: SSL Settings

SSL/TLS → Overview → Set to **Full**

### Step 3: Page Rules

Rules → Page Rules → Create Page Rule

**Cache Everything:**
```
URL: investza.com/*
Settings:
  - Cache Level: Cache Everything
  - Edge Cache TTL: 1 month
```

### Step 4: Speed Optimizations

Speed → Optimization:
- Auto Minify: ✓ CSS, JavaScript, HTML
- Brotli: ✓ On
- Early Hints: ✓ On

---

## Test Your Site

1. Visit `https://investza.com`
2. Check all pages load
3. Test videos play
4. Test on mobile
5. Check browser console for errors

---

## Update/Redeploy

```bash
# Make changes to your code
# Then run:
./deploy-aws.sh
```

That's it! Your changes are live.

---

## Costs

**Monthly estimate:**
- S3 Storage (5GB): $0.12
- S3 Requests: $0.50
- Data Transfer: $1-2 (Cloudflare caches most)
- **Total: ~$2-3/month** 🎉

Cloudflare Free Plan: $0

---

## Troubleshooting

### Site not loading?
- Wait 5-10 minutes for DNS propagation
- Check Cloudflare DNS records are correct
- Verify S3 bucket policy is set

### 404 on page refresh?
- Ensure error document is set to `index.html` in S3

### Videos not playing?
- Check they're in `my-app/public/` folder
- Verify they uploaded to S3

### Need help?
Check the full guide: `AWS_CLOUDFLARE_DEPLOYMENT.md`

---

## Quick Commands

```bash
# Deploy
./deploy-aws.sh

# Check what's in S3
aws s3 ls s3://investza-frontend --recursive

# Download from S3 (backup)
aws s3 sync s3://investza-frontend ./backup

# Delete everything (careful!)
aws s3 rm s3://investza-frontend --recursive
```

---

## Next: Deploy Backend

See `AWS_CLOUDFLARE_DEPLOYMENT.md` Part 3 for backend deployment on EC2.

Your colleague can deploy:
- Node.js backend → `api.investza.com`
- Spring Boot backend → `schedule-api.investza.com`

Then update environment variables and redeploy frontend.
