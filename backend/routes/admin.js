const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const authMiddleware = require('../middleware/authMiddleware');
const adminController = require('../controllers/adminController');

// Multer for image uploads (testimonials)
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, path.join(__dirname, '../../uploads')),
  filename: (req, file, cb) => cb(null, Date.now() + '_' + file.originalname.replace(/\s+/g, '_'))
});
const upload = multer({ storage });

// Dashboard Stats
router.get('/stats', authMiddleware('admin'), adminController.getStats);

// User Management
router.get('/users', authMiddleware('admin'), adminController.getUsers);
router.get('/user/:id', authMiddleware('admin'), adminController.getUser);
router.put('/user/:id', authMiddleware('admin'), adminController.updateUser);
router.delete('/user/:id', authMiddleware('admin'), adminController.deleteUser);

// Transfers
router.get('/transfers', authMiddleware('admin'), adminController.getTransfers);
router.post('/transfer', authMiddleware('admin'), adminController.createTransfer);
router.put('/transfer/:id', authMiddleware('admin'), adminController.updateTransfer);
router.delete('/transfer/:id', authMiddleware('admin'), adminController.deleteTransfer);

// Support Tickets
router.get('/tickets', authMiddleware('admin'), adminController.getTickets);
router.put('/ticket/:id', authMiddleware('admin'), adminController.updateTicketStatus);
router.delete('/ticket/:id', authMiddleware('admin'), adminController.deleteTicket);

// System Settings
router.get('/settings', authMiddleware('admin'), adminController.getSettings);
router.put('/settings', authMiddleware('admin'), adminController.updateSettings);

// Content Management: FAQs
router.get('/faqs', authMiddleware('admin'), adminController.getFAQs);
router.post('/faqs', authMiddleware('admin'), adminController.createFAQ);
router.put('/faqs/:id', authMiddleware('admin'), adminController.updateFAQ);
router.delete('/faqs/:id', authMiddleware('admin'), adminController.deleteFAQ);

// Content Management: Testimonials
router.get('/testimonials', authMiddleware('admin'), adminController.getTestimonials);
router.post('/testimonials', authMiddleware('admin'), upload.single('image'), adminController.createTestimonial);
router.put('/testimonials/:id', authMiddleware('admin'), upload.single('image'), adminController.updateTestimonial);
router.delete('/testimonials/:id', authMiddleware('admin'), adminController.deleteTestimonial);

// Content Management: News
router.get('/news', authMiddleware('admin'), adminController.getNews);
router.post('/news', authMiddleware('admin'), adminController.createNews);
router.put('/news/:id', authMiddleware('admin'), adminController.updateNews);
router.delete('/news/:id', authMiddleware('admin'), adminController.deleteNews);

// Content Management: Basic Content (About, Terms)
router.get('/content/:title', authMiddleware('admin'), adminController.getBasicContent);
router.put('/content/:title', authMiddleware('admin'), adminController.updateBasicContent);

// Email Templates
router.get('/email-templates', authMiddleware('admin'), adminController.getEmailTemplates);
router.put('/email-templates/:id', authMiddleware('admin'), adminController.updateEmailTemplate);

// Payment Gateways
router.get('/payment-gateways', authMiddleware('admin'), adminController.getPaymentGateways);
router.put('/payment-gateways/:id', authMiddleware('admin'), adminController.updatePaymentGateway);

// Notifications
router.post('/notifications', authMiddleware('admin'), adminController.sendNotification);

// Auth Account Management
router.get('/auth-accounts', authMiddleware('admin'), adminController.getAuthAccounts);
router.post('/auth-accounts', authMiddleware('admin'), adminController.createAuthAccount);
router.put('/auth-accounts/:id', authMiddleware('admin'), adminController.updateAuthAccount);
router.delete('/auth-accounts/:id', authMiddleware('admin'), adminController.deleteAuthAccount);
router.put('/auth-config', authMiddleware('admin'), adminController.updateAuthConfig);

module.exports = router;