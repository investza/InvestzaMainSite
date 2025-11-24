import mongoose from 'mongoose';

const portfolioReviewSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
    trim: true
  },
  contactNumber: {
    type: String,
    required: true,
    trim: true
  },
  investmentValue: {
    type: String,
    required: true,
    enum: ['0-25L', '25L-50L', '50L-2Cr', '2Cr and above']
  },
  email: {
    type: String,
    required: true,
    lowercase: true,
    trim: true
  },
  formType: {
    type: String,
    default: 'portfolio-review',
    enum: ['portfolio-review', 'schedule-call', 'event-register']
  },
  status: {
    type: String,
    default: 'new',
    enum: ['new', 'contacted', 'converted', 'rejected']
  },
  notes: {
    type: String,
    default: ''
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model('PortfolioReview', portfolioReviewSchema);
