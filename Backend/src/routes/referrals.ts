import express from 'express';
import { auth, AuthRequest } from '../middleware/auth';
import Referral, { ReferralStatus } from '../models/Referral';

const router = express.Router();

router.post('/', auth, async (req: AuthRequest, res) => {
  try {
    const { name, email, experience, resumeUrl } = req.body;
    const referral = new Referral({
      name,
      email,
      experience,
      resumeUrl,
      referredBy: req.user?.userId,
    });
    await referral.save();
    res.status(201).json(referral);
  } catch (error) {
    res.status(400).json({ error: 'Failed to create referral' });
  }
});

router.get('/', auth, async (req: AuthRequest, res) => {
  try {
    const referrals = await Referral.find({ referredBy: req.user?.userId })
      .sort({ createdAt: -1 });
    res.json(referrals);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch referrals' });
  }
});


router.patch('/:id/status', auth, async (req: AuthRequest, res) => {
  try {
    const { status } = req.body;
    if (!Object.values(ReferralStatus).includes(status)) {
      return res.status(400).json({ error: 'Invalid status' });
    }

    const referral = await Referral.findOneAndUpdate(
      { _id: req.params.id, referredBy: req.user?.userId },
      { status },
      { new: true }
    );

    if (!referral) {
      return res.status(404).json({ error: 'Referral not found' });
    }

    res.json(referral);
  } catch (error) {
    res.status(400).json({ error: 'Failed to update status' });
  }
});

export default router;
