# Quick Start - Testing the Form Submission System

## Current Setup Status

✅ **Completed:**
- Backend server created with Express.js
- MongoDB integration for data storage
- Email notification system configured
- Frontend updated to send data to backend
- Test .env file created

## Testing Locally (Right Now)

### Step 1: Update Email Credentials

Edit `server/.env` with your Gmail credentials:

```
PORT=5000
ADMIN_EMAIL=your-email@gmail.com
ADMIN_PASSWORD=your-16-char-app-password
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
MONGODB_URI=mongodb+srv://investza:investza123@investza-cluster.mongodb.net/investza?retryWrites=true&w=majority
NODE_ENV=development
```

**To get Gmail App Password:**
1. Go to [Google Account Security](https://myaccount.google.com/security)
2. Enable 2-Step Verification (if not already done)
3. Go to [App Passwords](https://myaccount.google.com/apppasswords)
4. Select "Mail" and "Windows Computer"
5. Copy the 16-character password

### Step 2: Start the Backend Server

```bash
cd server
npm start
```

You should see:
```
MongoDB connected successfully
Email transporter ready
Server running on http://localhost:5000
```

### Step 3: Test the Form

1. Open http://localhost:3000 in your browser
2. Click "Review my Portfolio" button
3. Fill out the form:
   - Full Name: John Doe
   - Contact: 9876543210
   - Investment Value: 50L-2Cr
   - Email: your-email@gmail.com
   - Check privacy policy
   - Complete reCAPTCHA
4. Click Submit

### Step 4: Check Results

**You should receive 2 emails:**
1. **Admin email** (to your ADMIN_EMAIL) - Contains all form details
2. **User confirmation email** (to the email entered in form) - Thank you message

**Check database:**
```bash
# In another terminal, you can view submissions via API
curl http://localhost:5000/api/submissions
```

## For Tomorrow's Deployment

### Option A: Quick Deploy to Heroku (Recommended)

1. **Create Heroku account** at [heroku.com](https://heroku.com)

2. **Install Heroku CLI:**
   ```bash
   brew install heroku
   ```

3. **Login to Heroku:**
   ```bash
   heroku login
   ```

4. **Create Heroku app:**
   ```bash
   heroku create investza-backend
   ```

5. **Set environment variables:**
   ```bash
   heroku config:set ADMIN_EMAIL="your-email@gmail.com"
   heroku config:set ADMIN_PASSWORD="your-app-password"
   heroku config:set MONGODB_URI="mongodb+srv://investza:investza123@investza-cluster.mongodb.net/investza?retryWrites=true&w=majority"
   heroku config:set SMTP_HOST="smtp.gmail.com"
   heroku config:set SMTP_PORT="587"
   heroku config:set NODE_ENV="production"
   ```

6. **Deploy:**
   ```bash
   git push heroku main
   ```

7. **Get your backend URL:**
   ```bash
   heroku apps:info investza-backend
   ```
   It will be something like: `https://investza-backend-xxxxx.herokuapp.com`

### Option B: Deploy Frontend to Vercel

1. **Push code to GitHub**

2. **Go to [vercel.com](https://vercel.com)**

3. **Import your GitHub repository**

4. **Set environment variable:**
   ```
   REACT_APP_API_URL=https://investza-backend-xxxxx.herokuapp.com
   ```

5. **Deploy**

### Update Frontend for Production

Edit `my-app/src/components/Header.js` and change:

```javascript
// From:
const response = await fetch(`http://localhost:5000${endpoint}`, {

// To:
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';
const response = await fetch(`${API_URL}${endpoint}`, {
```

## Database Information

**Current MongoDB Setup:**
- **Cluster**: investza-cluster
- **Database**: investza
- **Username**: investza
- **Password**: investza123

**Collections:**
- `portfolioreviews` - Stores all form submissions

**Access MongoDB:**
1. Go to [MongoDB Atlas](https://cloud.mongodb.com)
2. Login with: investza / investza123
3. View data in "Collections" tab

## API Endpoints

### Submit Portfolio Review
```
POST /api/portfolio-review
Body: {
  fullName: string,
  contactNumber: string,
  investmentValue: string,
  email: string,
  recaptchaToken: string
}
```

### Get All Submissions
```
GET /api/submissions
Returns: Array of all form submissions
```

### Get Single Submission
```
GET /api/submissions/:id
Returns: Single submission by ID
```

### Update Submission Status
```
PATCH /api/submissions/:id
Body: {
  status: 'new' | 'contacted' | 'converted' | 'rejected',
  notes: string
}
```

## Troubleshooting

### "Email transporter error"
- Check Gmail credentials in .env
- Verify App Password is correct
- Ensure 2-Step Verification is enabled

### "MongoDB connection error"
- Check MONGODB_URI in .env
- Verify MongoDB Atlas cluster is running
- Check IP whitelist in MongoDB Atlas

### Form not submitting
- Check browser console for errors
- Verify backend server is running
- Check CORS settings in server.js

### Emails going to spam
- Add your email to contacts
- Check email provider's spam settings
- Verify sender email is authenticated

## Next Steps

1. **Test locally** - Fill out form and verify emails arrive
2. **Deploy backend** - Use Heroku or Railway
3. **Deploy frontend** - Use Vercel or Netlify
4. **Update API URL** - Point frontend to production backend
5. **Monitor submissions** - Check MongoDB Atlas dashboard

## Support Files

- `server/SETUP.md` - Detailed setup instructions
- `server/PRODUCTION_DEPLOYMENT.md` - Full production guide
- `IMPLEMENTATION_SUMMARY.md` - Technical overview
