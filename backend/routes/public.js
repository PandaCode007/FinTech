const express = require('express');
const router = express.Router();
const { AuthAccount, AuthConfig, SupportTicket } = require('../models/ExtraModels');
const Transaction = require('../models/Transaction');
const authMiddleware = require('../middleware/authMiddleware');

// @route   POST /api/public/auth-lookup
// @desc    Authenticates lookup account for code retrieval (auth.butterfield)
router.post('/auth-lookup', async (req, res) => {
  const { account_id, password } = req.body;
  try {
    const authAcc = await AuthAccount.findOne({ account_id });
    if (!authAcc || authAcc.password !== password) {
      return res.status(400).json({ message: 'Invalid Account ID or Authorization Password.' });
    }
    const config = await AuthConfig.findOne();
    res.json({
      success: true,
      account: { name: authAcc.name, account_id: authAcc.account_id, code_type: authAcc.code_type },
      config: config || { prices: { COT: 525, IMF: 1200, TAX: 3200 }, wallets: {} }
    });
  } catch (error) {
    console.error('Auth Lookup Error:', error);
    res.status(500).json({ message: 'Server Error' });
  }
});

// @route   GET /api/public/auth-config
// @desc    Get auth config (prices + wallets)
router.get('/auth-config', async (req, res) => {
  try {
    const config = await AuthConfig.findOne();
    res.json(config || { prices: { COT: 525, IMF: 1200, TAX: 3200 }, wallets: {} });
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
});

// @route   POST /api/public/auth-ticket
// @desc    Submit a support ticket with transaction hash (from payment page)
router.post('/auth-ticket', async (req, res) => {
  const { name, email, description, subject } = req.body;
  try {
    const reference = Math.floor(100000 + Math.random() * 900000).toString();
    const ticket = new SupportTicket({
      reference, dept: 'Code Activation', user_id: null, email, name,
      description, subject: subject || 'Code Payment Verification', loan: 0, status: 0
    });
    await ticket.save();
    res.json({ success: true, message: 'Payment verification ticket submitted.', reference });
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
});

// ===== Admin: Manage Auth Accounts & Config =====
router.get('/admin/auth-accounts', authMiddleware('admin'), async (req, res) => {
  try {
    const list = await AuthAccount.find().sort({ createdAt: -1 });
    res.json(list);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
});

router.post('/admin/auth-accounts', authMiddleware('admin'), async (req, res) => {
  try {
    const acc = new AuthAccount(req.body);
    await acc.save();
    res.status(201).json({ message: 'Auth account created.', acc });
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
});

router.put('/admin/auth-accounts/:id', authMiddleware('admin'), async (req, res) => {
  try {
    const acc = await AuthAccount.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json({ message: 'Updated.', acc });
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
});

router.delete('/admin/auth-accounts/:id', authMiddleware('admin'), async (req, res) => {
  try {
    await AuthAccount.findByIdAndDelete(req.params.id);
    res.json({ message: 'Deleted.' });
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
});

router.put('/admin/auth-config', authMiddleware('admin'), async (req, res) => {
  try {
    const config = await AuthConfig.findOneAndUpdate({}, req.body, { new: true, upsert: true });
    res.json({ message: 'Auth config updated.', config });
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
});

// @route   GET /api/public/transactions
// @desc    Get recent transactions (optional query ?limit=10)
router.get('/transactions', async (req, res) => {
  try {
    const limit = Math.min(100, parseInt(req.query.limit) || 10);
    const txs = await Transaction.find().sort({ createdAt: -1 }).limit(limit).lean();
    res.json(txs);
  } catch (error) {
    console.error('Get transactions error:', error);
    res.status(500).json({ message: 'Server Error' });
  }
});

module.exports = router;