import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import nodemailer from 'nodemailer';
import mongoose from 'mongoose';
import PortfolioReview from './models/PortfolioReview.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: ['http://localhost:3000', 'http://localhost:3001', 'http://localhost:5173'],
  credentials: true
}));
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/investza')
  .then(() => {
    console.log('MongoDB connected successfully');
  })
  .catch((error) => {
    console.log('MongoDB connection error:', error.message);
    console.log('Note: Database features will be unavailable. Email notifications will still work.');
  });

// Email transporter setup
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'smtp.gmail.com',
  port: process.env.SMTP_PORT || 587,
  secure: false,
  auth: {
    user: process.env.ADMIN_EMAIL,
    pass: process.env.ADMIN_PASSWORD
  }
});

// Verify transporter connection
transporter.verify((error, success) => {
  if (error) {
    console.log('Email transporter error:', error);
  } else {
    console.log('Email transporter ready');
  }
});

// Portfolio review form submission
app.post('/api/portfolio-review', async (req, res) => {
  try {
    const { fullName, contactNumber, investmentValue, email, recaptchaToken } = req.body;

    // Validate required fields
    if (!fullName || !contactNumber || !investmentValue || !email) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Save to database
    let dbRecord = null;
    try {
      const portfolioReview = new PortfolioReview({
        fullName,
        contactNumber,
        investmentValue,
        email,
        formType: 'portfolio-review',
        status: 'new'
      });
      dbRecord = await portfolioReview.save();
      console.log('Portfolio review saved to database:', dbRecord._id);
    } catch (dbError) {
      console.log('Database save error (non-critical):', dbError.message);
      // Continue with email even if database fails
    }

    // Email to admin
    const adminMailOptions = {
      from: process.env.ADMIN_EMAIL,
      to: process.env.ADMIN_EMAIL,
      subject: 'New Portfolio Review Request - Investza',
      html: `
        <h2>New Portfolio Review Request</h2>
        <p><strong>Name:</strong> ${fullName}</p>
        <p><strong>Contact Number:</strong> ${contactNumber}</p>
        <p><strong>Investment Value:</strong> ${investmentValue}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Submitted at:</strong> ${new Date().toLocaleString()}</p>
        ${dbRecord ? `<p><strong>Record ID:</strong> ${dbRecord._id}</p>` : ''}
      `
    };

    // Email to user
    const userMailOptions = {
      from: process.env.ADMIN_EMAIL,
      to: email,
      subject: 'Portfolio Review Request Received - Investza',
      html: `
        <h2>Thank You for Your Portfolio Review Request</h2>
        <p>Dear ${fullName},</p>
        <p>We have received your portfolio review request. Our team will analyze your investment details and get in touch with you shortly at <strong>${contactNumber}</strong>.</p>
        <p><strong>Your Details:</strong></p>
        <ul>
          <li>Investment Value: ${investmentValue}</li>
          <li>Contact: ${contactNumber}</li>
        </ul>
        <p>If you have any questions in the meantime, feel free to reach out to us.</p>
        <p>Best regards,<br/>Investza Team</p>
      `
    };

    // Send emails
    await transporter.sendMail(adminMailOptions);
    await transporter.sendMail(userMailOptions);

    res.status(200).json({ 
      success: true, 
      message: 'Form submitted successfully. Confirmation email sent.',
      recordId: dbRecord?._id
    });
  } catch (error) {
    console.error('Error submitting form:', error);
    res.status(500).json({ 
      error: 'Failed to submit form. Please try again later.' 
    });
  }
});

// Schedule call form submission
app.post('/api/schedule-call', async (req, res) => {
  try {
    const { fullName, contactNumber, email, preferredDate, preferredTime } = req.body;

    if (!fullName || !contactNumber || !email) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Save to database
    let dbRecord = null;
    try {
      const portfolioReview = new PortfolioReview({
        fullName,
        contactNumber,
        email,
        formType: 'schedule-call',
        status: 'new',
        notes: `Preferred Date: ${preferredDate || 'Not specified'}, Preferred Time: ${preferredTime || 'Not specified'}`
      });
      dbRecord = await portfolioReview.save();
      console.log('Schedule call saved to database:', dbRecord._id);
    } catch (dbError) {
      console.log('Database save error (non-critical):', dbError.message);
    }

    const adminMailOptions = {
      from: process.env.ADMIN_EMAIL,
      to: process.env.ADMIN_EMAIL,
      subject: 'New Schedule Call Request - Investza',
      html: `
        <h2>New Schedule Call Request</h2>
        <p><strong>Name:</strong> ${fullName}</p>
        <p><strong>Contact Number:</strong> ${contactNumber}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Preferred Date:</strong> ${preferredDate || 'Not specified'}</p>
        <p><strong>Preferred Time:</strong> ${preferredTime || 'Not specified'}</p>
        <p><strong>Submitted at:</strong> ${new Date().toLocaleString()}</p>
        ${dbRecord ? `<p><strong>Record ID:</strong> ${dbRecord._id}</p>` : ''}
      `
    };

    const userMailOptions = {
      from: process.env.ADMIN_EMAIL,
      to: email,
      subject: 'Call Scheduled - Investza',
      html: `
        <h2>Your Call Has Been Scheduled</h2>
        <p>Dear ${fullName},</p>
        <p>Thank you for scheduling a call with us. We will contact you at <strong>${contactNumber}</strong> as per your preference.</p>
        <p>Our team will reach out to you shortly to confirm the details.</p>
        <p>Best regards,<br/>Investza Team</p>
      `
    };

    await transporter.sendMail(adminMailOptions);
    await transporter.sendMail(userMailOptions);

    res.status(200).json({ 
      success: true, 
      message: 'Call scheduled successfully.',
      recordId: dbRecord?._id
    });
  } catch (error) {
    console.error('Error scheduling call:', error);
    res.status(500).json({ 
      error: 'Failed to schedule call. Please try again later.' 
    });
  }
});

// Get all submissions (admin dashboard)
app.get('/api/submissions', async (req, res) => {
  try {
    const submissions = await PortfolioReview.find().sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      count: submissions.length,
      data: submissions
    });
  } catch (error) {
    console.error('Error fetching submissions:', error);
    res.status(500).json({
      error: 'Failed to fetch submissions'
    });
  }
});

// Get submission by ID
app.get('/api/submissions/:id', async (req, res) => {
  try {
    const submission = await PortfolioReview.findById(req.params.id);
    if (!submission) {
      return res.status(404).json({ error: 'Submission not found' });
    }
    res.status(200).json({
      success: true,
      data: submission
    });
  } catch (error) {
    console.error('Error fetching submission:', error);
    res.status(500).json({
      error: 'Failed to fetch submission'
    });
  }
});

// Update submission status
app.patch('/api/submissions/:id', async (req, res) => {
  try {
    const { status, notes } = req.body;
    const submission = await PortfolioReview.findByIdAndUpdate(
      req.params.id,
      { status, notes, updatedAt: Date.now() },
      { new: true }
    );
    if (!submission) {
      return res.status(404).json({ error: 'Submission not found' });
    }
    res.status(200).json({
      success: true,
      data: submission
    });
  } catch (error) {
    console.error('Error updating submission:', error);
    res.status(500).json({
      error: 'Failed to update submission'
    });
  }
});

// Health check
app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'Server is running' });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
