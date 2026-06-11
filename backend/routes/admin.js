const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Transfer = require('../models/Transfer');
const TempTransfer = require('../models/TempTransfer');
const { SupportTicket, Notification, Beneficiary, CheckDeposit, Setting, PaymentGateway, News, Testimonial, FAQ, BasicContent, EmailTemplate } = require('../models/ExtraModels');
const authMiddleware = require('../middleware/authMiddleware');

// @route   GET /api/admin/stats
// @desc    Get Admin Panel dashboard statistics
router.get('/stats', authMiddleware('admin'), async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalTickets = await SupportTicket.countDocuments();
    const pendingChecks = await CheckDeposit.countDocuments();
    const pendingTickets = await SupportTicket.countDocuments({ status: 0 });

    const userBalances = await User.aggregate([
      { $group: { _id: null, totalSavings: { $sum: '$savings_balance' }, totalChecking: { $sum: '$check_balance' } } }
    ]);

    const totalSavings = userBalances.length > 0 ? userBalances[0].totalSavings : 0;
    const totalChecking = userBalances.length > 0 ? userBalances[0].totalChecking : 0;

    res.json({
      totalUsers,
      totalTickets,
      pendingChecks,
      pendingTickets,
      totalSavings,
      totalChecking
    });
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
});

// @route   GET /api/admin/users
// @desc    Get all users list
router.get('/users', authMiddleware('admin'), async (req, res) => {
  try {
    const users = await User.find().sort({ createdAt: -1 });
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
});

// @route   PUT /api/admin/user/:id
// @desc    Update user details (including balances, custom codes, status, etc.)
router.put('/user/:id', authMiddleware('admin'), async (req, res) => {
  try {
    const updateData = req.body;
    const user = await User.findByIdAndUpdate(req.params.id, updateData, { new: true });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json({ message: 'User updated successfully.', user });
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
});

// @route   DELETE /api/admin/user/:id
// @desc    Delete user
router.delete('/user/:id', authMiddleware('admin'), async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    // Also delete their transfers
    await Transfer.deleteMany({ user_id: req.params.id });
    res.json({ message: 'User and all associated transfers deleted.' });
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
});

// @route   GET /api/admin/transfers
// @desc    Get all transfer logs
router.get('/transfers', authMiddleware('admin'), async (req, res) => {
  try {
    const list = await Transfer.find().populate('user_id', 'name email').sort({ createdAt: -1 });
    res.json(list);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
});

// @route   POST /api/admin/transfer
// @desc    Create manual transfer log (Credit/Debit) for users
router.post('/transfer', authMiddleware('admin'), async (req, res) => {
  try {
    const { user_id, amount, bank_name, sender_acc, receiver_name, receiver_acc, type, remarks, status } = req.body;
    const user = await User.findById(user_id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    const reference = Math.floor(100000 + Math.random() * 900000).toString();
    const txMonth = new Date().toLocaleString('en-US', { month: 'long', year: 'numeric' });

    // Update user balance if status is Successful
    if (status === 'Successful') {
      const balanceField = sender_acc === user.savings_acc ? 'savings_balance' : 'check_balance';
      if (type === 'Debit') {
        user[balanceField] -= Number(amount);
      } else {
        user[balanceField] += Number(amount);
      }
      await user.save();
    }

    const tx = new Transfer({
      user_id: user._id,
      amount,
      bank_name,
      sender_id: user.account_id,
      sender_acc,
      reference,
      receiver_name,
      receiver_acc,
      type,
      remarks,
      status,
      balance: sender_acc === user.savings_acc ? user.savings_balance : user.check_balance,
      month: txMonth
    });

    await tx.save();
    res.status(201).json({ message: 'Transfer logged successfully.', tx });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

// @route   GET /api/admin/tickets
// @desc    Get all support tickets
router.get('/tickets', authMiddleware('admin'), async (req, res) => {
  try {
    const list = await SupportTicket.find().populate('user_id', 'name email').sort({ createdAt: -1 });
    res.json(list);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
});

// @route   PUT /api/admin/ticket/:id
// @desc    Update support ticket status
router.put('/ticket/:id', authMiddleware('admin'), async (req, res) => {
  try {
    const { status } = req.body;
    const ticket = await SupportTicket.findByIdAndUpdate(req.params.id, { status }, { new: true });
    res.json({ message: 'Ticket status updated.', ticket });
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
});

// @route   GET /api/admin/settings
// @desc    Get system settings
router.get('/settings', authMiddleware('admin'), async (req, res) => {
  try {
    let setting = await Setting.findOne();
    if (!setting) {
      setting = new Setting();
      await setting.save();
    }
    res.json(setting);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
});

// @route   PUT /api/admin/settings
// @desc    Update system settings
router.put('/settings', authMiddleware('admin'), async (req, res) => {
  try {
    const setting = await Setting.findOneAndUpdate({}, req.body, { new: true, upsert: true });
    res.json({ message: 'Settings updated successfully.', setting });
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
});

module.exports = router;
