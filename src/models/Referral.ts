import mongoose from 'mongoose';

export enum ReferralStatus {
  NEW = 'New',
  EVALUATED = 'Evaluated',
  HIRED = 'Hired',
  REJECTED = 'Rejected'
}

const referralSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  experience: {
    type: Number,
    required: true,
  },
  resumeUrl: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: Object.values(ReferralStatus),
    default: ReferralStatus.NEW,
  },
  referredBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  }
}, { timestamps: true });

const Referral = mongoose.model('Referral', referralSchema);

export default Referral;
