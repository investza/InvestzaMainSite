# Production Deployment Guide

This guide covers deploying your Investza form submission system to production.

## Architecture Overview

Your system has two components:
1. **Frontend**: React app (deployed on Vercel, Netlify, or similar)
2. **Backend**: Node.js/Express server with MongoDB (deployed on Heroku, Railway, Render, or similar)

## Recommended Production Setup

### Option 1: Heroku + MongoDB Atlas (Easiest)

#### Step 1: Set up MongoDB Atlas

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free account
3. Create a new cluster (free tier available)
4. Create a database user with a strong password
5. Get your connection string (looks like: `mongodb+srv://username:password@cluster.mongodb.net/dbname`)

#### Step 2: Deploy to Heroku

1. Install Heroku CLI: `brew install heroku`
2. Login: `heroku login`
3. Create app: `heroku create your-app-name`
4. Set environment variables:
   ```bash
   heroku config:set MONGODB_URI="your-mongodb-connection-string"
   heroku config:set ADMIN_EMAIL="your-email@gmail.com"
   heroku config:set ADMIN_PASSWORD="your-app-password"
   heroku config:set SMTP_HOST="smtp.gmail.com"
   heroku config:set SMTP_PORT="587"
   heroku config:set NODE_ENV="production"
   ```
5. Deploy: `git push heroku main`

### Option 2: Railway.app (Modern Alternative)

1. Go to [Railway.app](https://railway.app)
2. Connect your GitHub repository
3. Add MongoDB plugin from Railway marketplace
4. Set environment variables in Railway dashboard
5. Deploy automatically on push

### Option 3: Render.com

1. Go to [Render.com](https://render.com)
2. Create new Web Service
3. Connect GitHub repo
4. Add MongoDB Atlas connection string
5. Set environment variables
6. Deploy

## Email Service for Production

### Gmail (Limited - 500 emails/day)
- Use App Passwords (already configured in .env)
- Good for testing and small volume

### SendGrid (Recommended - 100 emails/day free)

1. Sign up at [SendGrid](https://sendgrid.com)
2. Create API key
3. Update server.js:
   ```javascript
   const transporter = nodemailer.createTransport({
     host: 'smtp.sendgrid.net',
     port: 587,
     auth: {
       user: 'apikey',
       pass: process.env.SENDGRID_API_KEY
     }
   });
   ```
4. Set environment variable: `SENDGRID_API_KEY=your-key`

### AWS SES (Scalable)

1. Set up AWS account
2. Verify email addresses in SES
3. Get SMTP credentials
4. Update transporter configuration

### Mailgun (Developer-friendly)

1. Sign up at [Mailgun](https://www.mailgun.com)
2. Get SMTP credentials
3. Update transporter with Mailgun SMTP settings

## Frontend Deployment

### Vercel (Recommended for React)

1. Push code to GitHub
2. Go to [Vercel](https://vercel.com)
3. Import project
4. Set environment variable:
   ```
   REACT_APP_API_URL=https://your-backend-url.com
   ```
5. Deploy

### Update Frontend API URL

In `my-app/src/components/Header.js`, update the API endpoint:

```javascript
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

const response = await fetch(`${API_URL}/api/portfolio-review`, {
  // ...
});
```

## Database Backup Strategy

### MongoDB Atlas Automatic Backups
- Enabled by default on paid plans
- Free tier: manual backups only

### Manual Backup
```bash
mongodump --uri "mongodb+srv://user:pass@cluster.mongodb.net/investza"
```

### Automated Backup Script
Create a cron job to backup daily:
```bash
0 2 * * * mongodump --uri "$MONGODB_URI" --out /backups/$(date +\%Y\%m\%d)
```

## Monitoring & Logging

### Server Logs
- Heroku: `heroku logs --tail`
- Railway: View in dashboard
- Render: View in dashboard

### Error Tracking (Optional)
Add Sentry for error monitoring:
```bash
npm install @sentry/node
```

### Database Monitoring
- MongoDB Atlas: Built-in monitoring dashboard
- Check connection metrics, query performance

## Security Checklist

- [ ] Use HTTPS only (automatic on Heroku/Railway/Render)
- [ ] Set strong MongoDB password
- [ ] Use environment variables for all secrets
- [ ] Enable CORS only for your domain
- [ ] Add rate limiting to prevent abuse
- [ ] Validate all inputs on backend
- [ ] Use reCAPTCHA (already implemented)
- [ ] Keep dependencies updated: `npm audit fix`
- [ ] Use SMTP authentication (already configured)

## Rate Limiting (Optional but Recommended)

Add to server.js:
```javascript
import rateLimit from 'express-rate-limit';

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5 // limit each IP to 5 requests per windowMs
});

app.post('/api/portfolio-review', limiter, async (req, res) => {
  // ...
});
```

Install: `npm install express-rate-limit`

## Cost Estimation

### Free Tier Options
- **MongoDB Atlas**: Free tier (512MB storage)
- **Heroku**: Paid only ($7/month minimum)
- **Railway**: Free tier with $5 credit
- **Render**: Free tier available
- **Gmail**: Free (500 emails/day)

### Recommended Budget
- Backend hosting: $7-15/month
- MongoDB: Free-$10/month
- Email service: Free-$20/month
- **Total: $7-45/month**

## Troubleshooting Production Issues

### Emails not sending
1. Check SMTP credentials in environment variables
2. Verify email service is active
3. Check spam folder
4. Review server logs for errors

### Database connection errors
1. Verify MongoDB URI is correct
2. Check IP whitelist in MongoDB Atlas
3. Ensure database user has correct permissions
4. Check network connectivity

### CORS errors
1. Update CORS origin in server.js with production URL
2. Ensure frontend and backend URLs match

### High latency
1. Check database query performance
2. Add indexes to frequently queried fields
3. Consider caching strategies

## Maintenance

### Weekly
- Monitor error logs
- Check database storage usage
- Review form submissions

### Monthly
- Update dependencies: `npm update`
- Review security advisories: `npm audit`
- Backup database manually
- Check email delivery rates

### Quarterly
- Review and optimize database queries
- Update Node.js version if needed
- Review and update email templates

## Support & Resources

- [MongoDB Atlas Docs](https://docs.atlas.mongodb.com)
- [Heroku Docs](https://devcenter.heroku.com)
- [Nodemailer Docs](https://nodemailer.com)
- [Express.js Docs](https://expressjs.com)
