const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const User = require('../models/User');
const Transfer = require('../models/Transfer');
const TempTransfer = require('../models/TempTransfer');
const { SupportTicket, Notification, Beneficiary, CheckDeposit, Setting, PaymentGateway, News } = require('../models/ExtraModels');
const authMiddleware = require('../middleware/authMiddleware');

// Configure Multer for File Uploads (Check front/back images, Profile images)
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '../../uploads'));
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '_' + file.originalname.replace(/\s+/g, '_'));
  }
});

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
  fileFilter: (req, file, cb) => {
    const filetypes = /jpeg|jpg|png|gif/;
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);
    if (mimetype && extname) {
      return cb(null, true);
    }
    cb(new Error('Only image files (jpg, jpeg, png, gif) are allowed!'));
  }
});

// Helper to calculate total credits/debits for current month
const getMonthlyStats = async (accNumber) => {
  const currentMonthStr = new Date().toLocaleString('en-US', { month: 'long', year: 'numeric' }); // e.g. "June 2026"
  const credits = await Transfer.aggregate([
    { $match: { receiver_acc: accNumber, month: currentMonthStr, type: 'Credit', status: 'Successful' } },
    { $group: { _id: null, total: { $sum: '$amount' } } }
  ]);
  const debits = await Transfer.aggregate([
    { $match: { sender_acc: accNumber, month: currentMonthStr, type: 'Debit', status: 'Successful' } },
    { $group: { _id: null, total: { $sum: '$amount' } } }
  ]);
  return {
    creditTotal: credits.length > 0 ? credits[0].total : 0,
    debitTotal: debits.length > 0 ? debits[0].total : 0
  };
};

// @route   GET /api/user/dashboard
// @desc    Get user dashboard stats & basic info
router.get('/dashboard', authMiddleware('user'), async (req, res) => {
  try {
    const user = await User.findById(req.user.user_id).select('-password');
    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }

    // Get notifications count
    const notificationCount = await Notification.countDocuments({ user_id: user._id, status: 0 });

    // Recent transactions (transfers)
    const recentTransfers = await Transfer.find({ user_id: user._id })
      .sort({ createdAt: -1 })
      .limit(10);

    // Get monthly statistics
    const savingsStats = await getMonthlyStats(user.savings_acc);
    const checkingStats = await getMonthlyStats(user.check_acc);

    // Payment gateways
    const gateways = await PaymentGateway.find({ status: 1 });

    // Active news
    const news = await News.find({ status: '1' }).sort({ createdAt: -1 });

    // Update login log (simulated)
    user.lastTime = new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
    user.lastDate = new Date().toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' });
    user.ip = req.ip || req.headers['x-forwarded-for'] || '127.0.0.1';
    await user.save();

    res.json({
      user,
      notificationCount,
      recentTransfers,
      stats: {
        savings: {
          monthlyCredit: savingsStats.creditTotal,
          monthlyDebit: savingsStats.debitTotal
        },
        checking: {
          monthlyCredit: checkingStats.creditTotal,
          monthlyDebit: checkingStats.debitTotal
        }
      },
      gateways,
      news
    });

  } catch (error) {
    console.error('Dashboard Error:', error);
    res.status(500).json({ message: 'Server Error' });
  }
});

// @route   GET /api/user/beneficiaries
// @desc    Get beneficiaries
router.get('/beneficiaries', authMiddleware('user'), async (req, res) => {
  try {
    const list = await Beneficiary.find({ user_id: req.user.user_id }).sort({ createdAt: -1 });
    res.json(list);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
});

// @route   POST /api/user/beneficiary
// @desc    Add a beneficiary
router.post('/beneficiary', authMiddleware('user'), upload.single('file'), async (req, res) => {
  try {
    const { name, address, bank, swift, rtn, acc_no, email } = req.body;
    const user = await User.findById(req.user.user_id);

    if (user.allow_beneficiary !== 1) {
      return res.status(403).json({ message: 'Your account is not allowed to add beneficiaries. Please contact support.' });
    }

    const image = req.file ? req.file.filename : 'user-default.png';

    const beneficiary = new Beneficiary({
      user_id: user._id,
      name,
      address,
      bank,
      swift,
      rtn,
      acc_no,
      email,
      image
    });

    await beneficiary.save();
    res.status(201).json({ message: 'Beneficiary Added Successfully.', beneficiary });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

// @route   DELETE /api/user/beneficiary/:id
// @desc    Delete a beneficiary
router.delete('/beneficiary/:id', authMiddleware('user'), async (req, res) => {
  try {
    await Beneficiary.findOneAndDelete({ _id: req.params.id, user_id: req.user.user_id });
    res.json({ message: 'Beneficiary Deleted Successfully.' });
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
});

// @route   POST /api/user/transfer
// @desc    Initiate local, internal, or wire transfers
router.post('/transfer', authMiddleware('user'), async (req, res) => {
  const { accountType, type, bankName, receiverName, receiverAcc, amount, swift, routing, address, remarks, pin } = req.body;

  try {
    const user = await User.findById(req.user.user_id);
    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }

    // 1. PIN Validation
    if (pin !== user.pin) {
      return res.status(400).json({ message: 'Incorrect Transfer Security PIN. Please try again.' });
    }

    // 2. Status validations
    const restrictedStatuses = ['DailyLimit', 'WeeklyLimit', 'MonthlyLimit', 'Declined', 'DeclinedLogin', 'Dormant'];
    if (restrictedStatuses.includes(user.status)) {
      return res.status(403).json({ message: `Transaction Restricted: Your account status is currently: ${user.status}. Please contact support.` });
    }

    const balanceField = accountType === 'savings' ? 'savings_balance' : 'check_balance';
    const activeAccNumber = accountType === 'savings' ? user.savings_acc : user.check_acc;
    const currentBalance = user[balanceField];

    if (amount > currentBalance) {
      return res.status(400).json({ message: 'Sorry, your balance is insufficient to make this transfer.' });
    }

    const reference = Math.floor(100000000 + Math.random() * 900000000).toString();
    const txMonth = new Date().toLocaleString('en-US', { month: 'long', year: 'numeric' });

    // 3. COT / IMF / TAX Validation stage if CotExpire
    if (user.status === 'CotExpire') {
      const tempTx = new TempTransfer({
        user_id: user._id,
        amount,
        bank_name: bankName,
        bank_address: address,
        sender_id: user.account_id,
        sender_acc: activeAccNumber,
        reference,
        receiver_name: receiverName,
        receiver_acc: receiverAcc,
        type: 'Debit',
        swift,
        routing,
        remarks,
        status: 'Pending',
        balance: currentBalance - amount,
        month: txMonth
      });
      await tempTx.save();
      return res.status(200).json({
        codeRequired: true,
        codeType: 'COT',
        reference,
        message: 'COT verification code required to authorize transfer.'
      });
    }

    // 4. Execution of Transfers
    if (type === 'internal') {
      // Find internal receiver
      const receiver = await User.findOne({ $or: [{ savings_acc: receiverAcc }, { check_acc: receiverAcc }] });
      if (!receiver) {
        return res.status(404).json({ message: 'Receiver account details not found.' });
      }

      if (receiver._id.equals(user._id)) {
        return res.status(400).json({ message: 'Transfer to own account not allowed.' });
      }

      const recBalanceField = receiver.savings_acc === receiverAcc ? 'savings_balance' : 'check_balance';

      // Deduct sender & Credit receiver
      user[balanceField] -= amount;
      receiver[recBalanceField] += amount;

      await user.save();
      await receiver.save();

      // Record Debit Transfer
      const debitTx = new Transfer({
        user_id: user._id,
        amount,
        bank_name: bankName || 'ButterField Internal',
        sender_id: user.account_id,
        sender_acc: activeAccNumber,
        reference,
        receiver_name: receiver.name,
        receiver_acc: receiverAcc,
        type: 'Debit',
        swift,
        routing,
        remarks,
        status: 'Successful',
        balance: user[balanceField],
        month: txMonth,
        bank_address: address
      });
      await debitTx.save();

      // Record Credit Transfer
      const creditTx = new Transfer({
        user_id: receiver._id,
        amount,
        bank_name: bankName || 'ButterField Internal',
        sender_id: user.account_id,
        sender_acc: activeAccNumber,
        reference,
        receiver_name: receiver.name,
        receiver_acc: receiverAcc,
        type: 'Credit',
        swift,
        routing,
        remarks,
        status: 'Successful',
        balance: receiver[recBalanceField],
        month: txMonth,
        bank_address: address
      });
      await creditTx.save();

      return res.status(200).json({ success: true, reference, message: 'Internal Transfer Completed Successfully.' });

    } else {
      // Local or Wire transfers
      user[balanceField] -= amount;
      await user.save();

      const transfer = new Transfer({
        user_id: user._id,
        amount,
        bank_name: bankName,
        sender_id: user.account_id,
        sender_acc: activeAccNumber,
        reference,
        receiver_name: receiverName,
        receiver_acc: receiverAcc,
        type: 'Debit',
        swift,
        routing,
        remarks,
        status: 'Successful',
        balance: user[balanceField],
        month: txMonth,
        bank_address: address
      });
      await transfer.save();

      return res.status(200).json({ success: true, reference, message: 'Transfer Completed and Processing successfully.' });
    }

  } catch (error) {
    console.error('Transfer Error:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// @route   POST /api/user/verify-codes
// @desc    Verify sequential COT -> IMF -> TAX codes
router.post('/verify-codes', authMiddleware('user'), async (req, res) => {
  const { reference, codeType, enteredCode } = req.body;

  try {
    const user = await User.findById(req.user.user_id);
    const tempTx = await TempTransfer.findOne({ reference, user_id: user._id });

    if (!tempTx) {
      return res.status(404).json({ message: 'Active transaction record not found.' });
    }

    if (codeType === 'COT') {
      if (enteredCode !== user.cot) {
        return res.status(400).json({ message: 'Incorrect COT Code. Please verify and try again.' });
      }
      return res.json({ nextStage: 'IMF', message: 'COT Code Verified. Please enter IMF Code.' });
    }

    if (codeType === 'IMF') {
      if (enteredCode !== user.imf) {
        return res.status(400).json({ message: 'Incorrect IMF Code. Please verify and try again.' });
      }
      return res.json({ nextStage: 'TAX', message: 'IMF Code Verified. Please enter TAX Code.' });
    }

    if (codeType === 'TAX') {
      if (enteredCode !== user.tax) {
        return res.status(400).json({ message: 'Incorrect TAX Code. Please verify and try again.' });
      }

      // All verified! Execute the transfer and deduct balance
      const accountType = tempTx.sender_acc === user.savings_acc ? 'savings_balance' : 'check_balance';
      user[accountType] -= tempTx.amount;
      await user.save();

      const finalTx = new Transfer({
        user_id: user._id,
        amount: tempTx.amount,
        bank_name: tempTx.bank_name,
        bank_address: tempTx.bank_address,
        sender_id: tempTx.sender_id,
        sender_acc: tempTx.sender_acc,
        reference: tempTx.reference,
        receiver_name: tempTx.receiver_name,
        receiver_acc: tempTx.receiver_acc,
        type: 'Debit',
        swift: tempTx.swift,
        routing: tempTx.routing,
        remarks: tempTx.remarks,
        status: 'Successful',
        balance: user[accountType],
        month: tempTx.month
      });

      await finalTx.save();
      await TempTransfer.deleteOne({ _id: tempTx._id });

      return res.json({ success: true, message: 'Transfer Authorized & Completed Successfully!' });
    }

    res.status(400).json({ message: 'Invalid verification request.' });

  } catch (error) {
    console.error('Code Verification Error:', error);
    res.status(500).json({ message: 'Server Error' });
  }
});

// @route   POST /api/user/check-deposit
// @desc    Submit check deposit front and back photo
router.post('/check-deposit', authMiddleware('user'), upload.fields([{ name: 'front' }, { name: 'back' }]), async (req, res) => {
  try {
    const { remarks } = req.body;
    if (!req.files || !req.files.front || !req.files.back) {
      return res.status(400).json({ message: 'Please upload both front and back check images.' });
    }

    const frontImg = req.files.front[0].filename;
    const backImg = req.files.back[0].filename;

    const check = new CheckDeposit({
      user_id: req.user.user_id,
      front: frontImg,
      back: backImg,
      remarks
    });

    await check.save();
    res.status(201).json({ message: 'Check uploaded successfully and is currently under review.' });

  } catch (error) {
    console.error('Check Upload Error:', error);
    res.status(500).json({ message: 'Server Error' });
  }
});

// @route   POST /api/user/support-ticket
// @desc    Submit support ticket / loan application
router.post('/support-ticket', authMiddleware('user'), async (req, res) => {
  const { dept, subject, description, loanAmount, occupation, loanRemarks } = req.body;

  try {
    const user = await User.findById(req.user.user_id);
    const reference = Math.floor(100000 + Math.random() * 900000).toString();

    let ticketDesc = description;
    let isLoan = 0;

    if (dept === 'Loan') {
      isLoan = 1;
      ticketDesc = `
        <p><strong>Name of Applicant:</strong> ${user.name}</p>
        <p><strong>Email of Applicant:</strong> ${user.email}</p>
        <p><strong>Amount Requested:</strong> ${user.currency}${loanAmount}</p>
        <p><strong>Occupation:</strong> ${occupation}</p>
        <p><strong>Additional Remarks:</strong> ${loanRemarks}</p>
      `;
    }

    const ticket = new SupportTicket({
      reference,
      dept,
      user_id: user._id,
      email: user.email,
      name: user.name,
      description: ticketDesc,
      subject: subject || `${user.currency}${loanAmount} Loan Application`,
      loan: isLoan,
      status: 0
    });

    await ticket.save();
    res.status(201).json({ message: 'Ticket / Application Submitted Successfully.', reference });

  } catch (error) {
    console.error('Ticket Error:', error);
    res.status(500).json({ message: 'Server Error' });
  }
});

// @route   GET /api/user/tickets
// @desc    Get support tickets
router.get('/tickets', authMiddleware('user'), async (req, res) => {
  try {
    const list = await SupportTicket.find({ user_id: req.user.user_id }).sort({ createdAt: -1 });
    res.json(list);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
});

module.exports = router;
