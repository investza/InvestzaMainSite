# Email Notification Setup Guide

This guide will help you set up email notifications for form submissions.

## Prerequisites

- Node.js installed
- Gmail account (or any SMTP-compatible email service)

## Setup Steps

### 1. Install Dependencies

```bash
cd server
npm install
```

### 2. Configure Email Service (Gmail)

#### For Gmail:

1. Go to [Google Account Security](https://myaccount.google.com/security)
2. Enable "2-Step Verification" if not already enabled
3. Go to [App Passwords](https://myaccount.google.com/apppasswords)
4. Select "Mail" and "Windows Computer" (or your device)
5. Google will generate a 16-character password
6. Copy this password

#### For Other Email Services:

Use your email provider's SMTP settings. Common ones:
- **Outlook**: smtp.office365.com (port 587)
- **Yahoo**: smtp.mail.yahoo.com (port 587)
- **SendGrid**: smtp.sendgrid.net (port 587)

### 3. Create .env File

Copy `.env.example` to `.env` and fill in your details:

```bash
cp .env.example .env
```

Edit `.env`:

```
PORT=5000
ADMIN_EMAIL=your-email@gmail.com
ADMIN_PASSWORD=your-16-char-app-password
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
```

### 4. Start the Server

```bash
npm start
```

Or for development with auto-reload:

```bash
npm run dev
```

The server should start on `http://localhost:5000`

## Testing

1. Make sure the React app is running on `http://localhost:3000`
2. Click "Review my Portfolio" button
3. Fill out the form and submit
4. Check your email for confirmation

## Troubleshooting

### "Invalid login credentials"
- Verify your email and password in `.env`
- For Gmail, make sure you're using an App Password, not your regular password
- Check that 2-Step Verification is enabled

### "Connection timeout"
- Verify SMTP_HOST and SMTP_PORT are correct
- Check your internet connection
- Some firewalls may block SMTP ports

### Emails not sending
- Check server console for error messages
- Verify email addresses are valid
- Check spam/junk folder

## Email Templates

The system sends two emails:

1. **Admin Notification**: Receives all form submissions with user details
2. **User Confirmation**: Sends confirmation to the user's email

You can customize the email templates in `server.js` by modifying the HTML in the `mailOptions` objects.

## Production Deployment

For production:

1. Use environment variables from your hosting provider
2. Consider using a dedicated email service like SendGrid, Mailgun, or AWS SES
3. Add rate limiting to prevent abuse
4. Implement proper error logging
5. Use HTTPS for all communications
