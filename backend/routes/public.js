const express = require('express');
const router = express.Router();
const pagesController = require('../controllers/pagesController');
const authMiddleware = require('../middleware/authMiddleware');
const { AuthAccount, AuthConfig, SupportTicket, Setting } = require('../models/ExtraModels');
const Transaction = require('../models/Transaction');

// Public Pages Routes
router.get('/about', pagesController.getAbout);
router.get('/terms', pagesController.getTerms);
router.get('/faqs', pagesController.getFaqs);
router.get('/testimonials', pagesController.getTestimonials);
router.get('/news', pagesController.getNews);
router.get('/news/:id', pagesController.getNewsItem);
router.post('/contact', pagesController.submitContact);

// Auth Lookup System (for code retrieval)
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

router.get('/auth-config', async (req, res) => {
  try {
    const config = await AuthConfig.findOne();
    res.json(config || { prices: { COT: 525, IMF: 1200, TAX: 3200 }, wallets: {} });
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
});

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

// Public Settings (no auth required)
router.get('/settings', async (req, res) => {
  try {
    const config = await AuthConfig.findOne();
    const setting = await Setting.findOne();
    res.json({
      company_name: setting?.company_name || 'ButterField',
      company_description: setting?.company_description || 'Modern Digital Banking, Smart Investments, Global Transfers',
      company_email: setting?.company_email || 'customercare@butterfieldapp.com',
      company_phone: setting?.company_phone || '07915636507',
      company_address: setting?.company_address || 'Butterfield Place, 12 Albert Panton Street, Grand Cayman KY1-1107, CAYMAN ISLANDS',
      allow_register: setting?.allow_register !== undefined ? setting.allow_register : 1,
      abrv: setting?.abrv || 'BFA',
      otp: setting?.otp || 0,
    });
  } catch (error) {
    console.error('Public settings error:', error);
    res.status(500).json({ message: 'Server Error' });
  }
});

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