# Portfolio Review Form - Email Notification Implementation

## What Was Done

I've set up a complete email notification system for your portfolio review form. Here's what's included:

### Backend Server (Node.js + Express)
- **Location**: `/server` directory
- **Features**:
  - Receives form submissions from the React frontend
  - Sends confirmation emails to users
  - Sends admin notifications with all form data
  - CORS enabled for localhost development
  - Health check endpoint

### Frontend Integration
- **Updated**: `my-app/src/components/Header.js`
- **Changes**: Modified `handleSubmit` to send form data to backend API
- The form now posts to `http://localhost:5000/api/portfolio-review`

### Email Notifications
When a user submits the portfolio review form, they receive:

1. **Admin Email** - Contains:
   - Full Name
   - Contact Number
   - Investment Value Range
   - Email Address
   - Submission Timestamp

2. **User Confirmation Email** - Contains:
   - Thank you message
   - Summary of their submission
   - Confirmation that the team will contact them

## Quick Start

### 1. Install Server Dependencies
```bash
cd server
npm install
```

### 2. Configure Email (Gmail Example)
- Go to [Google Account Security](https://myaccount.google.com/security)
- Enable 2-Step Verification
- Generate an App Password at [App Passwords](https://myaccount.google.com/apppasswords)
- Copy the 16-character password

### 3. Create .env File
```bash
cp server/.env.example server/.env
```

Edit `server/.env`:
```
PORT=5000
ADMIN_EMAIL=your-email@gmail.com
ADMIN_PASSWORD=your-16-char-app-password
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
```

### 4. Start the Server
```bash
cd server
npm start
```

### 5. Test the Form
- Keep React dev server running on `http://localhost:3000`
- Click "Review my Portfolio"
- Fill out and submit the form
- Check your email for confirmations

## API Endpoints

### Portfolio Review
- **POST** `/api/portfolio-review`
- **Body**:
  ```json
  {
    "fullName": "John Doe",
    "contactNumber": "9876543210",
    "investmentValue": "50L-2Cr",
    "email": "user@example.com",
    "recaptchaToken": "token..."
  }
  ```

### Schedule Call
- **POST** `/api/schedule-call`
- **Body**:
  ```json
  {
    "fullName": "John Doe",
    "contactNumber": "9876543210",
    "email": "user@example.com",
    "preferredDate": "2024-01-15",
    "preferredTime": "10:00 AM"
  }
  ```

## Customization

### Change Email Templates
Edit the HTML in `server/server.js` in the `mailOptions` objects to customize email content.

### Add More Form Types
The backend is set up to handle multiple form types. Add new endpoints following the same pattern.

### Use Different Email Service
Replace Gmail SMTP settings with your provider's settings in `.env`

## Files Created/Modified

**New Files:**
- `server/package.json` - Server dependencies
- `server/server.js` - Express server with email logic
- `server/.env.example` - Environment variables template
- `server/SETUP.md` - Detailed setup guide

**Modified Files:**
- `my-app/src/components/Header.js` - Added API call to backend

## Next Steps (Optional)

1. **Add Database**: Store submissions in MongoDB/PostgreSQL
2. **Add Notifications**: Integrate Slack/Discord notifications
3. **Add Rate Limiting**: Prevent spam submissions
4. **Add Email Templates**: Use template engines like EJS or Handlebars
5. **Deploy**: Use Heroku, Vercel, or AWS for production

## Support

For issues:
1. Check `server/SETUP.md` for troubleshooting
2. Verify `.env` file has correct credentials
3. Check server console for error messages
4. Ensure both servers (React on 3000, Node on 5000) are running
