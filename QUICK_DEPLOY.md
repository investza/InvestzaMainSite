# Quick Deploy to Vercel - 5 Minutes

## Step-by-Step (Fastest Method)

### 1. Open Vercel
Go to: https://vercel.com

### 2. Sign In
Click "Sign Up" → "Continue with GitHub"

### 3. Import Project
- Click "Add New..." → "Project"
- Find and select: `investza/landing-react`
- Click "Import"

### 4. Configure (IMPORTANT)
```
Framework Preset: Create React App
Root Directory: my-app          ← CHANGE THIS!
Build Command: npm run build
Output Directory: build
Install Command: npm install
```

### 5. Deploy
Click "Deploy" button

### 6. Wait
Build takes 2-3 minutes. You'll see:
- Installing dependencies...
- Building...
- Deploying...
- ✓ Success!

### 7. Get Your URL
You'll get a URL like: `investza-landing.vercel.app`

### 8. Test
Click the URL and test your site!

---

## What Works Now (Without Backend)
✅ All pages load
✅ Navigation works
✅ Videos play
✅ Animations work
✅ Mobile responsive
✅ All static content

## What Needs Backend (Later)
⏳ Contact form submissions
⏳ Newsletter signups
⏳ Schedule call flow
⏳ Portfolio review requests

---

## When Backend is Ready

### Add Environment Variables in Vercel:
1. Go to your project in Vercel
2. Settings → Environment Variables
3. Add:
   - Name: `REACT_APP_NODE_BACKEND_URL`
   - Value: `https://your-backend-url.com`
4. Add:
   - Name: `REACT_APP_CALLSCHEDULE_BACKEND_URL`
   - Value: `https://your-callschedule-backend.com`
5. Redeploy (Deployments → Click "..." → Redeploy)

---

## Custom Domain Setup

### 1. In Vercel
- Project Settings → Domains
- Click "Add"
- Enter your domain: `investza.com`

### 2. In Your Domain Provider (GoDaddy/Namecheap/etc)
Add these DNS records:

**For root domain (investza.com):**
```
Type: A
Name: @
Value: 76.76.21.21
```

**For www subdomain:**
```
Type: CNAME
Name: www
Value: cname.vercel-dns.com
```

### 3. Wait
DNS propagation takes 5-60 minutes

### 4. SSL Certificate
Vercel automatically provisions SSL (HTTPS) - no action needed!

---

## That's It! 🚀

Your site is now live and will auto-deploy every time you push to GitHub!
