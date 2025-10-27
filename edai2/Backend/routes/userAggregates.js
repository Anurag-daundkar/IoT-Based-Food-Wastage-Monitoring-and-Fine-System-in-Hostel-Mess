import express from 'express';
import User from '../models/User.js';

const router = express.Router();

// POST /api/users/:id/aggregate
// Recompute root-level aggregates (waste, totalFine, pendingFine, score)
// from the user's monthlyData array and save to MongoDB.
router.post('/:id/aggregate', async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    const monthly = user.monthlyData || [];

    const totalWaste = monthly.reduce((s, m) => s + (m.waste || 0), 0);
    const totalFines = monthly.reduce((s, m) => s + (m.totalFines || 0), 0);
    const pendingFine = monthly.reduce((s, m) => s + (m.finesPending || 0), 0);
    const scoreAvg = monthly.length
      ? Math.round(monthly.reduce((s, m) => s + (m.score || 0), 0) / monthly.length)
      : user.score || 0;

    user.waste = totalWaste;
    user.totalFine = totalFines;
    user.pendingFine = pendingFine;
    user.score = scoreAvg;

    await user.save();

    res.json({ message: 'Aggregates updated', user });
  } catch (err) {
    console.error('Aggregate update error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// POST /api/users/:id/monthly
// Body: { year, month, waste?, finesCollected?, finesPending?, totalFines?, score? }
// Adds or updates the monthly entry for the user and recomputes aggregates
router.post('/:id/monthly', async (req, res) => {
  try {
    const { id } = req.params;
    const { year, month } = req.body;
    if (!year || !month) return res.status(400).json({ message: 'year and month required' });

    const user = await User.findById(id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    const monthly = user.monthlyData || [];
    let entry = monthly.find((m) => m.year === year && m.month === month);
    if (!entry) {
      entry = {
        year,
        month,
        waste: 0,
        finesCollected: 0,
        finesPending: 0,
        totalFines: 0,
        score: 0,
      };
      monthly.push(entry);
    }

    // Update fields provided in body
    const updatable = ["waste", "finesCollected", "finesPending", "totalFines", "score"];
    updatable.forEach((k) => {
      if (req.body[k] !== undefined) entry[k] = req.body[k];
    });

    user.monthlyData = monthly;

    // Recompute aggregates
    const totalWaste = monthly.reduce((s, m) => s + (m.waste || 0), 0);
    const totalFines = monthly.reduce((s, m) => s + (m.totalFines || 0), 0);
    const pendingFine = monthly.reduce((s, m) => s + (m.finesPending || 0), 0);
    const scoreAvg = monthly.length
      ? Math.round(monthly.reduce((s, m) => s + (m.score || 0), 0) / monthly.length)
      : user.score || 0;

    user.waste = totalWaste;
    user.totalFine = totalFines;
    user.pendingFine = pendingFine;
    user.score = scoreAvg;

    await user.save();

    res.json({ message: 'Monthly entry updated', user });
  } catch (err) {
    console.error('Monthly update error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});


export default router;

