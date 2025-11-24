# Deployment Guide - Investza Landing Site

## Overview
This guide will help you deploy your React frontend online. Your colleague will handle the backend deployment separately.

---

## Option 1: Vercel (Recommended - Easiest & Free)

### Why Vercel?
- ✅ Free for personal/commercial projects
- ✅ Automatic deployments from GitHub
- ✅ Built-in CDN and SSL
- ✅ Perfect for React apps
- ✅ Zero configuration needed

### Steps:

#### 1. Sign Up for Vercel
- Go to [vercel.com](https://vercel.com)
- Click "Sign Up"
- Choose "Continue with GitHub"
- Authorize Vercel to access your GitHub account

#### 2. Import Your Project
- Click "Add New..." → "Project"
- Select your GitHub repository: `investza/landing-react`
- Vercel will auto-detect it's a React app

#### 3. Configure Build Settings
```
Framework Preset: Create React App
Root Directory: my-app
Build Command: npm run build
Output Directory: build
Install Command: npm install
```

#### 4. Environment Variables (if needed later)
When your backend is ready, add:
```
REACT_APP_API_URL=https://your-backend-url.com
REACT_APP_CALLSCHEDULE_API=https://your-callschedule-backend.com
```

#### 5. Deploy
- Click "Deploy"
- Wait 2-3 minutes for build to complete
- You'll get a URL like: `your-project.vercel.app`

#### 6. Custom Domain (Optional)
- Go to Project Settings → Domains
- Add your custom domain (e.g., `investza.com`)
- Follow DNS configuration instructions
- Vercel provides free SSL automatically

### Auto-Deploy on Push
Every time you push to GitHub main branch, Vercel will automatically rebuild and deploy!

---

## Option 2: Netlify (Alternative - Also Great)

### Why Netlify?
- ✅ Free tier with generous limits
- ✅ Easy drag-and-drop deployment
- ✅ Automatic HTTPS
- ✅ Form handling built-in

### Steps:

#### 1. Sign Up
- Go to [netlify.com](https://netlify.com)
- Sign up with GitHub

#### 2. Deploy from GitHub
- Click "Add new site" → "Import an existing project"
- Choose GitHub
- Select `investza/landing-react`

#### 3. Build Settings
```
Base directory: my-app
Build command: npm run build
Publish directory: my-app/build
```

#### 4. Deploy
- Click "Deploy site"
- Get URL like: `your-site.netlify.app`

#### 5. Custom Domain
- Site settings → Domain management
- Add custom domain
- Configure DNS records

---

## Option 3: GitHub Pages (Free but Limited)

### Steps:

#### 1. Install gh-pages package
```bash
cd my-app
npm install --save-dev gh-pages
```

#### 2. Update package.json
Add to `my-app/package.json`:
```json
{
  "homepage": "https://investza.github.io/landing-react",
  "scripts": {
    "predeploy": "npm run build",
    "deploy": "gh-pages -d build"
  }
}
```

#### 3. Deploy
```bash
npm run deploy
```

#### 4. Configure GitHub Pages
- Go to GitHub repo → Settings → Pages
- Source: Deploy from branch `gh-pages`
- Save

**Note:** GitHub Pages doesn't support server-side routing well. You may need to use HashRouter instead of BrowserRouter.

---

## Pre-Deployment Checklist

### 1. Update API URLs
Create environment files for production:

**Create `my-app/.env.production`:**
```env
REACT_APP_NODE_BACKEND_URL=https://your-node-backend.com
REACT_APP_CALLSCHEDULE_BACKEND_URL=https://your-spring-backend.com
```

**Update API files to use environment variables:**

`my-app/src/api/flowApi.js`:
```javascript
const API = process.env.REACT_APP_CALLSCHEDULE_BACKEND_URL || "http://localhost:8080/api/flow";
```

### 2. Build and Test Locally
```bash
cd my-app
npm run build
npx serve -s build
```
Visit `http://localhost:3000` to test the production build

### 3. Check for Console Errors
- Open browser DevTools
- Check Console tab for any errors
- Fix any warnings or errors

### 4. Optimize Assets
Your videos are already in public folder, which is good. Consider:
- Compressing videos further if needed
- Using lazy loading for images
- Enabling gzip compression (automatic on Vercel/Netlify)

### 5. SEO Optimization
Update `my-app/public/index.html`:
```html
<title>Investza - Wealth Management & Investment Advisory</title>
<meta name="description" content="Expert wealth management and investment advisory services. Tailored strategies for your financial goals.">
<meta property="og:title" content="Investza - Wealth Management">
<meta property="og:description" content="Expert wealth management and investment advisory services.">
<meta property="og:image" content="%PUBLIC_URL%/logo512.png">
```

---

## Connecting Frontend to Backend

Once your colleague deploys the backends, you'll need to:

### 1. Update Environment Variables

**On Vercel:**
- Project Settings → Environment Variables
- Add:
  - `REACT_APP_NODE_BACKEND_URL` = `https://your-node-backend.com`
  - `REACT_APP_CALLSCHEDULE_BACKEND_URL` = `https://your-spring-backend.com`
- Redeploy

**On Netlify:**
- Site settings → Environment variables
- Add the same variables
- Trigger redeploy

### 2. Update API Files

**`my-app/src/api/flowApi.js`:**
```javascript
const API = process.env.REACT_APP_CALLSCHEDULE_BACKEND_URL 
  ? `${process.env.REACT_APP_CALLSCHEDULE_BACKEND_URL}/api/flow`
  : "http://localhost:8080/api/flow";
```

### 3. CORS Configuration
Your colleague needs to configure CORS on both backends to allow requests from your frontend domain:

**Node.js Backend (server/server.js):**
```javascript
app.use(cors({
  origin: ['https://your-vercel-domain.vercel.app', 'https://investza.com'],
  credentials: true
}));
```

**Spring Boot Backend:**
Already configured in `callschedule-backend/src/main/java/com/example/demo/config/CorsConfig.java`
Update allowed origins to include your production domain.

---

## Recommended Deployment Strategy

### Phase 1: Deploy Frontend Only (Now)
1. Deploy to Vercel with current localhost API URLs
2. Test all static pages and UI
3. Get your custom domain configured

### Phase 2: Connect Backends (When Ready)
1. Get backend URLs from your colleague
2. Add environment variables to Vercel
3. Update API files to use env variables
4. Redeploy
5. Test all API integrations

### Phase 3: Final Testing
1. Test all forms (Contact, Newsletter, Schedule Call)
2. Test on mobile devices
3. Check page load speeds
4. Verify all videos play correctly
5. Test all navigation links

---

## Quick Start - Deploy Now!

**Fastest way to get online (5 minutes):**

1. Go to [vercel.com](https://vercel.com)
2. Sign in with GitHub
3. Click "Add New Project"
4. Select `investza/landing-react`
5. Set Root Directory to `my-app`
6. Click "Deploy"
7. Done! Share your URL

---

## Monitoring & Analytics

### Add Google Analytics (Optional)
1. Get tracking ID from Google Analytics
2. Add to `my-app/public/index.html`:
```html
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

### Vercel Analytics
- Free built-in analytics
- Enable in Project Settings → Analytics

---

## Troubleshooting

### Build Fails
- Check Node version (should be 16+)
- Clear cache: `rm -rf node_modules package-lock.json && npm install`
- Check for TypeScript errors

### Videos Not Playing
- Ensure videos are in `my-app/public/` folder
- Check video file sizes (should be under 10MB each)
- Verify video formats are web-compatible (MP4 H.264)

### Routing Issues (404 on refresh)
- Vercel/Netlify handle this automatically
- For other hosts, add `_redirects` file or configure server

### API Calls Failing
- Check CORS configuration on backend
- Verify environment variables are set
- Check browser console for specific errors

---

## Cost Estimate

### Free Tier (Recommended for Start)
- **Vercel:** Free forever for personal/commercial
- **Netlify:** Free with 100GB bandwidth/month
- **Domain:** $10-15/year (Google Domains, Namecheap)

### Paid Tier (If Needed Later)
- **Vercel Pro:** $20/month (more bandwidth, team features)
- **Netlify Pro:** $19/month (more builds, team features)

---

## Next Steps

1. ✅ Choose deployment platform (Vercel recommended)
2. ✅ Deploy frontend
3. ✅ Test all pages
4. ⏳ Wait for backend deployment
5. ⏳ Connect APIs
6. ⏳ Configure custom domain
7. ⏳ Final testing
8. 🚀 Launch!

---

## Support Resources

- **Vercel Docs:** https://vercel.com/docs
- **Netlify Docs:** https://docs.netlify.com
- **React Deployment:** https://create-react-app.dev/docs/deployment

---

**Need Help?** 
- Vercel has excellent support via Discord
- Check deployment logs for specific errors
- Most issues are CORS or environment variable related
