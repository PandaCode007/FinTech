/**
 * User Controller - Express version of PHP User controller
 * Handles all authenticated user operations
 */
const User = require('../models/User');
const Transfer = require('../models/Transfer');
const TempTransfer = require('../models/TempTransfer');
const Transaction = require('../models/Transaction');
const {
  SupportTicket,
  Notification,
  Beneficiary,
  CheckDeposit,
  Setting,
  PaymentGateway,
  News,
  BasicContent
} = require('../models/ExtraModels');

/**
 * Helper: Monthly stats for savings & checking accounts
 */
const getMonthlyStats = async (accNumber) => {
  const currentMonthStr = new Date().toLocaleString('en-US', { month: 'long', year: 'numeric' });
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

/**
 * GET /api/user/dashboard - User dashboard with balances, stats, notifications
 */
exports.getDashboard = async (req, res) => {
  try {
    const user = await User.findById(req.user.user_id).select('-password');
    if (!user) return res.status(404).json({ message: 'User not found.' });

    const notificationCount = await Notification.countDocuments({ user_id: user._id, status: 0 });
    const recentTransfers = await Transfer.find({ user_id: user._id }).sort({ createdAt: -1 }).limit(10);
    const savingsStats = await getMonthlyStats(user.savings_acc);
    const checkingStats = await getMonthlyStats(user.check_acc);
    const gateways = await PaymentGateway.find({ status: 1 });
    const news = await News.find({ status: '1' }).sort({ createdAt: -1 });
    const beneficiaries = await Beneficiary.find({ user_id: user._id }).sort({ createdAt: -1 });

    // Update login tracking
    user.lastTime = new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
    user.lastDate = new Date().toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' });
    user.lastUrl = req.originalUrl;
    user.ip = req.ip || req.headers['x-forwarded-for'] || '127.0.0.1';
    await user.save();

    res.json({
      user,
      notificationCount,
      recentTransfers,
      beneficiaries,
      stats: {
        savings: { monthlyCredit: savingsStats.creditTotal, monthlyDebit: savingsStats.debitTotal },
        checking: { monthlyCredit: checkingStats.creditTotal, monthlyDebit: checkingStats.debitTotal }
      },
      gateways,
      news
    });
  } catch (error) {
    console.error('Dashboard Error:', error);
    res.status(500).json({ message: 'Server Error' });
  }
};

/**
 * GET /api/user/beneficiaries - List beneficiaries
 */
exports.getBeneficiaries = async (req, res) => {
  try {
    const list = await Beneficiary.find({ user_id: req.user.user_id }).sort({ createdAt: -1 });
    res.json(list);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

/**
 * POST /api/user/beneficiary - Add beneficiary
 */
exports.addBeneficiary = async (req, res) => {
  try {
    const { name, address, bank, swift, rtn, acc_no, email } = req.body;
    const user = await User.findById(req.user.user_id);
    if (user.allow_beneficiary !== 1) {
      return res.status(403).json({ message: 'Beneficiary addition not allowed. Contact support.' });
    }
    const image = req.file ? req.file.filename : 'user-default.png';
    const beneficiary = new Beneficiary({ user_id: user._id, name, address, bank, swift, rtn, acc_no, email, image });
    await beneficiary.save();
    res.status(201).json({ message: 'Beneficiary Added Successfully.', beneficiary });
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

/**
 * DELETE /api/user/beneficiary/:id - Delete beneficiary
 */
exports.deleteBeneficiary = async (req, res) => {
  try {
    await Beneficiary.findOneAndDelete({ _id: req.params.id, user_id: req.user.user_id });
    res.json({ message: 'Beneficiary Deleted Successfully.' });
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

/**
 * POST /api/user/transfer - Initiate fund transfer
 * Handles local, internal, and wire transfers with PIN validation
 */
exports.submitTransfer = async (req, res) => {
  const { accountType, type, bankName, receiverName, receiverAcc, amount, swift, routing, address, remarks, pin } = req.body;

  try {
    const user = await User.findById(req.user.user_id);
    if (!user) return res.status(404).json({ message: 'User not found.' });

    // PIN Validation
    if (pin !== user.pin) {
      return res.status(400).json({ message: 'Incorrect Transfer Security PIN.' });
    }

    // Status checks
    const restrictedStatuses = ['DailyLimit', 'WeeklyLimit', 'MonthlyLimit', 'Declined', 'DeclinedLogin', 'Dormant'];
    if (restrictedStatuses.includes(user.status)) {
      return res.status(403).json({ message: `Transaction Restricted: Account status is "${user.status}". Contact support.` });
    }

    const balanceField = accountType === 'savings' ? 'savings_balance' : 'check_balance';
    const activeAccNumber = accountType === 'savings' ? user.savings_acc : user.check_acc;
    const currentBalance = user[balanceField];

    if (amount > currentBalance) {
      return res.status(400).json({ message: 'Insufficient balance for this transfer.' });
    }

    const reference = Math.floor(100000000 + Math.random() * 900000000).toString();
    const txMonth = new Date().toLocaleString('en-US', { month: 'long', year: 'numeric' });

    // COT code check - if CotExpire status, save as temp transfer
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

    // Execute transfer based on type
    if (type === 'internal') {
      const receiver = await User.findOne({ $or: [{ savings_acc: receiverAcc }, { check_acc: receiverAcc }] });
      if (!receiver) return res.status(404).json({ message: 'Receiver account not found.' });
      if (receiver._id.equals(user._id)) return res.status(400).json({ message: 'Self-transfer not allowed.' });

      const recBalanceField = receiver.savings_acc === receiverAcc ? 'savings_balance' : 'check_balance';
      user[balanceField] -= Number(amount);
      receiver[recBalanceField] += Number(amount);
      await user.save();
      await receiver.save();

      const debitTx = new Transfer({
        user_id: user._id, amount, bank_name: bankName || 'Internal Transfer',
        sender_id: user.account_id, sender_acc: activeAccNumber, reference,
        receiver_name: receiverName, receiver_acc: receiverAcc,
        type: 'Debit', swift, routing, remarks, status: 'Successful',
        balance: user[balanceField], month: txMonth
      });
      await debitTx.save();

      const creditTx = new Transfer({
        user_id: receiver._id, amount, bank_name: 'Internal Transfer',
        sender_id: user.account_id, sender_acc: activeAccNumber, reference,
        receiver_name: receiverName, receiver_acc: receiverAcc,
        type: 'Credit', status: 'Successful',
        balance: receiver[recBalanceField], month: txMonth
      });
      await creditTx.save();

      return res.status(200).json({ message: 'Transfer successful.', reference, status: 'Successful' });
    }

    // External / Wire transfer
    user[balanceField] -= Number(amount);
    await user.save();

    const tx = new Transfer({
      user_id: user._id, amount, bank_name: bankName || 'Wire Transfer',
      bank_address: address, sender_id: user.account_id, sender_acc: activeAccNumber,
      reference, receiver_name: receiverName, receiver_acc: receiverAcc,
      type: 'Debit', swift, routing, remarks, status: 'Pending',
      balance: user[balanceField], month: txMonth
    });
    await tx.save();

    res.status(200).json({ message: 'Transfer submitted successfully.', reference, status: 'Pending' });
  } catch (error) {
    console.error('Transfer Error:', error);
    res.status(500).json({ message: 'Server Error' });
  }
};

/**
 * POST /api/user/verify-codes - Verify COT/IMF/Tax codes for transfer
 */
exports.verifyCodes = async (req, res) => {
  const { codeType, code, reference } = req.body;
  try {
    const user = await User.findById(req.user.user_id);
    if (!user) return res.status(404).json({ message: 'User not found.' });

    const expectedCode = codeType.toLowerCase() === 'cot' ? user.cot
      : codeType.toLowerCase() === 'imf' ? user.imf
      : codeType.toLowerCase() === 'tax' ? user.tax : null;

    if (!expectedCode) return res.status(400).json({ message: 'Invalid code type.' });

    if (code !== expectedCode) {
      return res.status(400).json({ message: `Invalid ${codeType.toUpperCase()} code.` });
    }

    // If temp transfer exists, execute it
    if (reference) {
      const tempTx = await TempTransfer.findOne({ reference, user_id: user._id });
      if (tempTx) {
        const balanceField = tempTx.sender_acc === user.savings_acc ? 'savings_balance' : 'check_balance';
        user[balanceField] -= Number(tempTx.amount);
        await user.save();

        const tx = new Transfer({
          ...tempTx.toObject(),
          _id: undefined,
          __v: undefined,
          createdAt: undefined,
          updatedAt: undefined,
          status: 'Successful',
          balance: user[balanceField]
        });
        await tx.save();
        await TempTransfer.deleteOne({ _id: tempTx._id });

        // Update user status from CotExpire
        if (user.status === 'CotExpire') {
          user.status = 'Active';
          await user.save();
        }

        return res.json({ message: `${codeType.toUpperCase()} verified. Transfer completed.`, reference, status: 'Successful' });
      }
      return res.status(404).json({ message: 'Pending transfer not found for this reference.' });
    }

    // Reset CotExpire status
    if (user.status === 'CotExpire') {
      user.status = 'Active';
      await user.save();
    }
    res.json({ message: `${codeType.toUpperCase()} code verified successfully.` });
  } catch (error) {
    console.error('Code Verification Error:', error);
    res.status(500).json({ message: 'Server Error' });
  }
};

/**
 * POST /api/user/support-ticket - Submit support ticket
 */
exports.submitSupportTicket = async (req, res) => {
  const { subject, description, dept, loan } = req.body;
  try {
    const user = await User.findById(req.user.user_id);
    const reference = Math.floor(100000 + Math.random() * 900000).toString();
    const ticket = new SupportTicket({
      reference, dept: dept || 'General', user_id: user._id,
      email: user.email, name: user.name, description,
      subject: subject || 'Support Request', loan: loan || 0, status: 0
    });
    await ticket.save();
    res.status(201).json({ message: 'Support ticket submitted.', reference });
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

/**
 * GET /api/user/tickets - Get user's support tickets
 */
exports.getTickets = async (req, res) => {
  try {
    const tickets = await SupportTicket.find({ user_id: req.user.user_id }).sort({ createdAt: -1 });
    res.json(tickets);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

/**
 * GET /api/user/notifications - Get user notifications
 */
exports.getNotifications = async (req, res) => {
  try {
    const notifications = await Notification.find({ user_id: req.user.user_id }).sort({ createdAt: -1 });
    res.json(notifications);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

/**
 * PUT /api/user/notification/:id/read - Mark notification as read
 */
exports.markNotificationRead = async (req, res) => {
  try {
    await Notification.findOneAndUpdate(
      { _id: req.params.id, user_id: req.user.user_id },
      { status: 1 }
    );
    res.json({ message: 'Notification marked as read.' });
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

/**
 * DELETE /api/user/notification/:id - Delete notification
 */
exports.deleteNotification = async (req, res) => {
  try {
    await Notification.findOneAndDelete({ _id: req.params.id, user_id: req.user.user_id });
    res.json({ message: 'Notification deleted.' });
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

/**
 * GET /api/user/profile - Get user profile
 */
exports.getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.user_id).select('-password');
    if (!user) return res.status(404).json({ message: 'User not found.' });
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

/**
 * PUT /api/user/profile - Update user profile (contact info)
 */
exports.updateProfile = async (req, res) => {
  try {
    const { name, phone, country, city, gender, address } = req.body;
    const user = await User.findByIdAndUpdate(
      req.user.user_id,
      { name, phone, country, city, gender, address },
      { new: true }
    ).select('-password');
    res.json({ message: 'Profile updated.', user });
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

/**
 * PUT /api/user/profile/photo - Update profile photo
 */
exports.updateProfilePhoto = async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ message: 'No file uploaded.' });
    const user = await User.findByIdAndUpdate(
      req.user.user_id,
      { image: req.file.filename },
      { new: true }
    ).select('-password');
    res.json({ message: 'Profile photo updated.', user });
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

/**
 * PUT /api/user/change-password - Change password
 */
exports.changePassword = async (req, res) => {
  const { old_password, new_password, confirm_password } = req.body;
  try {
    const user = await User.findById(req.user.user_id);
    if (!user) return res.status(404).json({ message: 'User not found.' });

    const isMatch = await user.comparePassword(old_password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid old password.' });
    if (new_password !== confirm_password) return res.status(400).json({ message: 'Passwords do not match.' });

    user.password = new_password;
    await user.save();
    res.json({ message: 'Password changed successfully. Please login again.', logout: true });
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

/**
 * GET /api/user/transactions - Get user transaction history
 */
exports.getTransactions = async (req, res) => {
  try {
    const { page = 1, limit = 20, type, startDate, endDate } = req.query;
    const query = { user_id: req.user.user_id };

    if (type) query.type = type;
    if (startDate || endDate) {
      query.createdAt = {};
      if (startDate) query.createdAt.$gte = new Date(startDate);
      if (endDate) query.createdAt.$lte = new Date(endDate);
    }

    const total = await Transfer.countDocuments(query);
    const transactions = await Transfer.find(query)
      .sort({ createdAt: -1 })
      .skip((Number(page) - 1) * Number(limit))
      .limit(Number(limit));

    res.json({ transactions, total, page: Number(page), pages: Math.ceil(total / Number(limit)) });
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

/**
 * GET /api/user/receipt/:reference - Get transfer receipt
 */
exports.getReceipt = async (req, res) => {
  try {
    const tx = await Transfer.findOne({ reference: req.params.reference, user_id: req.user.user_id });
    if (!tx) return res.status(404).json({ message: 'Transaction not found.' });
    res.json(tx);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

/**
 * POST /api/user/check-deposit - Submit check deposit
 */
exports.submitCheckDeposit = async (req, res) => {
  try {
    if (!req.files || !req.files.front || !req.files.back) {
      return res.status(400).json({ message: 'Both front and back images required.' });
    }
    const deposit = new CheckDeposit({
      user_id: req.user.user_id,
      front: req.files.front[0].filename,
      back: req.files.back[0].filename,
      remarks: req.body.remarks || ''
    });
    await deposit.save();
    res.status(201).json({ message: 'Check deposit submitted for review.' });
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

/**
 * GET /api/user/history - Get monthly statement for an account
 */
exports.getStatement = async (req, res) => {
  try {
    const { acc, month, year } = req.query;
    const user = await User.findById(req.user.user_id);
    if (!user) return res.status(404).json({ message: 'User not found.' });

    const targetAcc = acc || user.savings_acc;
    const query = {
      user_id: user._id,
      $or: [{ sender_acc: targetAcc }, { receiver_acc: targetAcc }]
    };
    if (month && year) {
      const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'];
      query.month = `${monthNames[Number(month) - 1]} ${year}`;
    }

    const transfers = await Transfer.find(query).sort({ createdAt: -1 });
    const balance = targetAcc === user.savings_acc ? user.savings_balance : user.check_balance;

    res.json({ account: targetAcc, balance, transfers });
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};