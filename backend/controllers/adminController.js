/**
 * Admin Controller - Express version of PHP Admin controller
 * Handles all admin operations for user management, transactions, settings, content
 */
const User = require('../models/User');
const Admin = require('../models/Admin');
const Transfer = require('../models/Transfer');
const Transaction = require('../models/Transaction');
const {
  SupportTicket,
  Notification,
  Beneficiary,
  CheckDeposit,
  Setting,
  PaymentGateway,
  EmailTemplate,
  News,
  FAQ,
  Testimonial,
  BasicContent,
  AuthAccount,
  AuthConfig
} = require('../models/ExtraModels');

/**
 * GET /api/admin/stats - Admin dashboard statistics
 */
exports.getStats = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const pendingTickets = await SupportTicket.countDocuments({ status: 0 });
    const totalTransfers = await Transfer.countDocuments();
    const totalTransactions = await Transaction.countDocuments();
    const lastUser = await User.findOne().sort({ createdAt: -1 }).select('name _id');
    const recentTickets = await SupportTicket.find({ status: 0 })
      .populate('user_id', 'name image')
      .sort({ createdAt: -1 })
      .limit(5);

    res.json({
      totalUsers,
      pendingTickets,
      totalTransfers,
      totalTransactions,
      lastUser,
      recentTickets
    });
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

/**
 * GET /api/admin/users - List all users
 */
exports.getUsers = async (req, res) => {
  try {
    const { page = 1, limit = 50, status, search } = req.query;
    const query = {};
    if (status) query.status = status;
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
        { account_id: { $regex: search, $options: 'i' } }
      ];
    }
    const total = await User.countDocuments(query);
    const users = await User.find(query)
      .select('-password')
      .sort({ createdAt: -1 })
      .skip((Number(page) - 1) * Number(limit))
      .limit(Number(limit));
    res.json({ users, total, page: Number(page), pages: Math.ceil(total / Number(limit)) });
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

/**
 * GET /api/admin/user/:id - Get single user
 */
exports.getUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('-password');
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

/**
 * PUT /api/admin/user/:id - Update user (status, balances, codes, etc.)
 */
exports.updateUser = async (req, res) => {
  try {
    const allowedFields = [
      'name', 'status', 'savings_balance', 'check_balance', 'email', 'phone',
      'country', 'city', 'address', 'zip', 'cot', 'tax', 'imf', 'pin',
      'allow_upload', 'allow_codes', 'allow_beneficiary', 'currency',
      'occupation', 'gender', 'dob', 'creditCard', 'expire'
    ];
    const updateData = {};
    for (const field of allowedFields) {
      if (req.body[field] !== undefined) updateData[field] = req.body[field];
    }
    const user = await User.findByIdAndUpdate(req.params.id, updateData, { new: true }).select('-password');
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json({ message: 'User updated successfully.', user });
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

/**
 * DELETE /api/admin/user/:id - Delete user and associated data
 */
exports.deleteUser = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    await Transfer.deleteMany({ user_id: req.params.id });
    await SupportTicket.deleteMany({ user_id: req.params.id });
    await Notification.deleteMany({ user_id: req.params.id });
    await Beneficiary.deleteMany({ user_id: req.params.id });
    await CheckDeposit.deleteMany({ user_id: req.params.id });
    res.json({ message: 'User and all associated data deleted.' });
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

/**
 * GET /api/admin/transfers - Get all transfers
 */
exports.getTransfers = async (req, res) => {
  try {
    const { page = 1, limit = 50, status, type } = req.query;
    const query = {};
    if (status) query.status = status;
    if (type) query.type = type;
    const total = await Transfer.countDocuments(query);
    const transfers = await Transfer.find(query)
      .populate('user_id', 'name email account_id')
      .sort({ createdAt: -1 })
      .skip((Number(page) - 1) * Number(limit))
      .limit(Number(limit));
    res.json({ transfers, total, page: Number(page), pages: Math.ceil(total / Number(limit)) });
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

/**
 * POST /api/admin/transfer - Create manual transfer (credit/debit)
 */
exports.createTransfer = async (req, res) => {
  try {
    const { user_id, amount, bank_name, sender_acc, receiver_name, receiver_acc, type, remarks, status } = req.body;
    const user = await User.findById(user_id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    const reference = Math.floor(100000 + Math.random() * 900000).toString();
    const txMonth = new Date().toLocaleString('en-US', { month: 'long', year: 'numeric' });

    if (status === 'Successful') {
      const balanceField = sender_acc === user.savings_acc ? 'savings_balance' : 'check_balance';
      if (type === 'Debit') user[balanceField] -= Number(amount);
      else user[balanceField] += Number(amount);
      await user.save();
    }

    const tx = new Transfer({
      user_id: user._id, amount: Number(amount),
      bank_name: bank_name || 'Manual Entry',
      sender_id: user.account_id, sender_acc,
      reference, receiver_name, receiver_acc,
      type, remarks, status: status || 'Pending',
      balance: sender_acc === user.savings_acc ? user.savings_balance : user.check_balance,
      month: txMonth
    });
    await tx.save();
    res.status(201).json({ message: 'Transfer logged successfully.', tx });
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

/**
 * PUT /api/admin/transfer/:id - Update transfer
 */
exports.updateTransfer = async (req, res) => {
  try {
    const tx = await Transfer.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!tx) return res.status(404).json({ message: 'Transfer not found' });
    res.json({ message: 'Transfer updated.', tx });
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

/**
 * DELETE /api/admin/transfer/:id - Delete transfer
 */
exports.deleteTransfer = async (req, res) => {
  try {
    await Transfer.findByIdAndDelete(req.params.id);
    res.json({ message: 'Transfer deleted.' });
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

/**
 * GET /api/admin/tickets - Get all support tickets
 */
exports.getTickets = async (req, res) => {
  try {
    const { status, page = 1, limit = 50 } = req.query;
    const query = {};
    if (status !== undefined) query.status = Number(status);
    const total = await SupportTicket.countDocuments(query);
    const tickets = await SupportTicket.find(query)
      .populate('user_id', 'name email image account_id')
      .sort({ createdAt: -1 })
      .skip((Number(page) - 1) * Number(limit))
      .limit(Number(limit));
    res.json({ tickets, total, page: Number(page), pages: Math.ceil(total / Number(limit)) });
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

/**
 * PUT /api/admin/ticket/:id - Update ticket status
 */
exports.updateTicketStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const ticket = await SupportTicket.findByIdAndUpdate(
      req.params.id,
      { status: Number(status) },
      { new: true }
    );
    if (!ticket) return res.status(404).json({ message: 'Ticket not found' });
    res.json({ message: 'Ticket status updated.', ticket });
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

/**
 * DELETE /api/admin/ticket/:id - Delete ticket
 */
exports.deleteTicket = async (req, res) => {
  try {
    await SupportTicket.findByIdAndDelete(req.params.id);
    res.json({ message: 'Ticket deleted.' });
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

/**
 * GET /api/admin/settings - Get system settings
 */
exports.getSettings = async (req, res) => {
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
};

/**
 * PUT /api/admin/settings - Update system settings
 */
exports.updateSettings = async (req, res) => {
  try {
    const setting = await Setting.findOneAndUpdate({}, req.body, { new: true, upsert: true });
    res.json({ message: 'Settings updated successfully.', setting });
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

/**
 * Content Management CRUD
 */

/* FAQs */
exports.getFAQs = async (req, res) => {
  try {
    const faqs = await FAQ.find().sort({ createdAt: -1 });
    res.json(faqs);
  } catch (error) { res.status(500).json({ message: 'Server Error' }); }
};

exports.createFAQ = async (req, res) => {
  try {
    const faq = new FAQ(req.body);
    await faq.save();
    res.status(201).json({ message: 'FAQ created.', faq });
  } catch (error) { res.status(500).json({ message: 'Server Error' }); }
};

exports.updateFAQ = async (req, res) => {
  try {
    const faq = await FAQ.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json({ message: 'FAQ updated.', faq });
  } catch (error) { res.status(500).json({ message: 'Server Error' }); }
};

exports.deleteFAQ = async (req, res) => {
  try {
    await FAQ.findByIdAndDelete(req.params.id);
    res.json({ message: 'FAQ deleted.' });
  } catch (error) { res.status(500).json({ message: 'Server Error' }); }
};

/* Testimonials */
exports.getTestimonials = async (req, res) => {
  try {
    const testimonials = await Testimonial.find().sort({ createdAt: -1 });
    res.json(testimonials);
  } catch (error) { res.status(500).json({ message: 'Server Error' }); }
};

exports.createTestimonial = async (req, res) => {
  try {
    const data = { ...req.body };
    if (req.file) data.image = req.file.filename;
    const testimonial = new Testimonial(data);
    await testimonial.save();
    res.status(201).json({ message: 'Testimonial created.', testimonial });
  } catch (error) { res.status(500).json({ message: 'Server Error' }); }
};

exports.updateTestimonial = async (req, res) => {
  try {
    const data = { ...req.body };
    if (req.file) data.image = req.file.filename;
    const testimonial = await Testimonial.findByIdAndUpdate(req.params.id, data, { new: true });
    res.json({ message: 'Testimonial updated.', testimonial });
  } catch (error) { res.status(500).json({ message: 'Server Error' }); }
};

exports.deleteTestimonial = async (req, res) => {
  try {
    await Testimonial.findByIdAndDelete(req.params.id);
    res.json({ message: 'Testimonial deleted.' });
  } catch (error) { res.status(500).json({ message: 'Server Error' }); }
};

/* News */
exports.getNews = async (req, res) => {
  try {
    const news = await News.find().sort({ createdAt: -1 });
    res.json(news);
  } catch (error) { res.status(500).json({ message: 'Server Error' }); }
};

exports.createNews = async (req, res) => {
  try {
    const article = new News(req.body);
    await article.save();
    res.status(201).json({ message: 'News article created.', article });
  } catch (error) { res.status(500).json({ message: 'Server Error' }); }
};

exports.updateNews = async (req, res) => {
  try {
    const article = await News.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json({ message: 'News updated.', article });
  } catch (error) { res.status(500).json({ message: 'Server Error' }); }
};

exports.deleteNews = async (req, res) => {
  try {
    await News.findByIdAndDelete(req.params.id);
    res.json({ message: 'News deleted.' });
  } catch (error) { res.status(500).json({ message: 'Server Error' }); }
};

/* Basic Content (About, Terms) */
exports.getBasicContent = async (req, res) => {
  try {
    const { title } = req.params;
    const content = await BasicContent.findOne({ title });
    res.json(content || { title, value: '' });
  } catch (error) { res.status(500).json({ message: 'Server Error' }); }
};

exports.updateBasicContent = async (req, res) => {
  try {
    const { title } = req.params;
    const { value } = req.body;
    const content = await BasicContent.findOneAndUpdate(
      { title },
      { title, value },
      { new: true, upsert: true }
    );
    res.json({ message: 'Content updated.', content });
  } catch (error) { res.status(500).json({ message: 'Server Error' }); }
};

/* Email Templates */
exports.getEmailTemplates = async (req, res) => {
  try {
    const templates = await EmailTemplate.find().sort({ createdAt: -1 });
    res.json(templates);
  } catch (error) { res.status(500).json({ message: 'Server Error' }); }
};

exports.updateEmailTemplate = async (req, res) => {
  try {
    const template = await EmailTemplate.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json({ message: 'Email template updated.', template });
  } catch (error) { res.status(500).json({ message: 'Server Error' }); }
};

/* Payment Gateways */
exports.getPaymentGateways = async (req, res) => {
  try {
    const gateways = await PaymentGateway.find().sort({ createdAt: -1 });
    res.json(gateways);
  } catch (error) { res.status(500).json({ message: 'Server Error' }); }
};

exports.updatePaymentGateway = async (req, res) => {
  try {
    const gateway = await PaymentGateway.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json({ message: 'Gateway updated.', gateway });
  } catch (error) { res.status(500).json({ message: 'Server Error' }); }
};

/* Notifications (Admin send) */
exports.sendNotification = async (req, res) => {
  try {
    const { user_id, subject, description } = req.body;
    const reference = Math.floor(100000 + Math.random() * 900000).toString();
    const notification = new Notification({
      user_id, reference, subject, description, status: 0, notice: 1
    });
    await notification.save();
    res.status(201).json({ message: 'Notification sent.', notification });
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

/* Auth Accounts Management */
exports.getAuthAccounts = async (req, res) => {
  try {
    const accounts = await AuthAccount.find().sort({ createdAt: -1 });
    res.json(accounts);
  } catch (error) { res.status(500).json({ message: 'Server Error' }); }
};

exports.createAuthAccount = async (req, res) => {
  try {
    const acc = new AuthAccount(req.body);
    await acc.save();
    res.status(201).json({ message: 'Auth account created.', acc });
  } catch (error) { res.status(500).json({ message: 'Server Error' }); }
};

exports.updateAuthAccount = async (req, res) => {
  try {
    const acc = await AuthAccount.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json({ message: 'Updated.', acc });
  } catch (error) { res.status(500).json({ message: 'Server Error' }); }
};

exports.deleteAuthAccount = async (req, res) => {
  try {
    await AuthAccount.findByIdAndDelete(req.params.id);
    res.json({ message: 'Deleted.' });
  } catch (error) { res.status(500).json({ message: 'Server Error' }); }
};

exports.updateAuthConfig = async (req, res) => {
  try {
    const config = await AuthConfig.findOneAndUpdate({}, req.body, { new: true, upsert: true });
    res.json({ message: 'Auth config updated.', config });
  } catch (error) { res.status(500).json({ message: 'Server Error' }); }
};