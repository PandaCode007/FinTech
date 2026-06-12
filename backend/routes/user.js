const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const authMiddleware = require('../middleware/authMiddleware');
const userController = require('../controllers/userController');

// Configure Multer for File Uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, path.join(__dirname, '../../uploads')),
  filename: (req, file, cb) => cb(null, Date.now() + '_' + file.originalname.replace(/\s+/g, '_'))
});
const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    const filetypes = /jpeg|jpg|png|gif/;
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);
    if (mimetype && extname) return cb(null, true);
    cb(new Error('Only image files are allowed!'));
  }
});

// Check deposit upload (front/back)
const checkUpload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    const filetypes = /jpeg|jpg|png|gif|pdf/;
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);
    if (mimetype && extname) return cb(null, true);
    cb(new Error('Only images and PDF files are allowed!'));
  }
});

// Dashboard
router.get('/dashboard', authMiddleware('user'), userController.getDashboard);

// Beneficiaries
router.get('/beneficiaries', authMiddleware('user'), userController.getBeneficiaries);
router.post('/beneficiary', authMiddleware('user'), upload.single('file'), userController.addBeneficiary);
router.delete('/beneficiary/:id', authMiddleware('user'), userController.deleteBeneficiary);

// Transfers
router.post('/transfer', authMiddleware('user'), userController.submitTransfer);
router.post('/verify-codes', authMiddleware('user'), userController.verifyCodes);

// Support Tickets
router.post('/support-ticket', authMiddleware('user'), userController.submitSupportTicket);
router.get('/tickets', authMiddleware('user'), userController.getTickets);

// Notifications
router.get('/notifications', authMiddleware('user'), userController.getNotifications);
router.put('/notification/:id/read', authMiddleware('user'), userController.markNotificationRead);
router.delete('/notification/:id', authMiddleware('user'), userController.deleteNotification);

// Profile
router.get('/profile', authMiddleware('user'), userController.getProfile);
router.put('/profile', authMiddleware('user'), userController.updateProfile);
router.put('/profile/photo', authMiddleware('user'), upload.single('photo'), userController.updateProfilePhoto);
router.put('/change-password', authMiddleware('user'), userController.changePassword);

// Transactions & History
router.get('/transactions', authMiddleware('user'), userController.getTransactions);
router.get('/history', authMiddleware('user'), userController.getStatement);
router.get('/receipt/:reference', authMiddleware('user'), userController.getReceipt);

// Check Deposit
router.post('/check-deposit', authMiddleware('user'), checkUpload.fields([
  { name: 'front', maxCount: 1 },
  { name: 'back', maxCount: 1 }
]), userController.submitCheckDeposit);

// Logout (client-side - just invalidate token)
router.post('/logout', authMiddleware('user'), (req, res) => {
  res.json({ message: 'Logged out successfully.' });
});

module.exports = router;