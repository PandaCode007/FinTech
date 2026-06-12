import axios from 'axios';

const API = axios.create({ baseURL: '/api', headers: { 'Content-Type': 'application/json' } });

API.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export const loginUser = (d) => API.post('/auth/login', d);
export const registerUser = (d) => API.post('/auth/register', d);
export const verifyOtpLogin = (d) => API.post('/auth/verify-otp-login', d);
export const adminLogin = (d) => API.post('/auth/admin/login', d);
export const getDashboard = () => API.get('/user/dashboard');
export const getBeneficiaries = () => API.get('/user/beneficiaries');
export const addBeneficiary = (fd) => API.post('/user/beneficiary', fd, { headers: { 'Content-Type': 'multipart/form-data' } });
export const deleteBeneficiary = (id) => API.delete(`/user/beneficiary/${id}`);
export const submitTransfer = (d) => API.post('/user/transfer', d);
export const verifyCodes = (d) => API.post('/user/verify-codes', d);
export const submitSupportTicket = (d) => API.post('/user/support-ticket', d);
export const getAdminStats = () => API.get('/admin/stats');
export const getAdminUsers = () => API.get('/admin/users');
export const updateUser = (id, d) => API.put(`/admin/user/${id}`, d);
export const deleteUser = (id) => API.delete(`/admin/user/${id}`);
export const getAdminTransfers = () => API.get('/admin/transfers');
export const createTransfer = (d) => API.post('/admin/transfer', d);
export const getAdminTickets = () => API.get('/admin/tickets');
export const updateTicketStatus = (id, d) => API.put(`/admin/ticket/${id}`, d);
export const getSettings = () => API.get('/admin/settings');
export const updateSettings = (d) => API.put('/admin/settings', d);
export const getAbout = () => API.get('/public/about');
export const getTerms = () => API.get('/public/terms');
export const getFaqs = () => API.get('/public/faqs');
export const getTestimonials = () => API.get('/public/testimonials');
export const getNews = () => API.get('/public/news');
export const getNewsItem = (id) => API.get(`/public/news/${id}`);
export const submitContact = (d) => API.post('/public/contact', d);
export const authLookup = (d) => API.post('/public/auth-lookup', d);
export const getAuthConfig = () => API.get('/public/auth-config');
export const submitAuthTicket = (d) => API.post('/public/auth-ticket', d);

// ===== Enhanced User API =====
// Profile
export const getProfile = () => API.get('/user/profile');
export const updateProfile = (d) => API.put('/user/profile', d);
export const updateProfilePhoto = (fd) => API.put('/user/profile/photo', fd, { headers: { 'Content-Type': 'multipart/form-data' } });
export const changePassword = (d) => API.put('/user/change-password', d);

// Transactions & History
export const getTransactions = (params) => API.get('/user/transactions', { params });
export const getReceipt = (ref) => API.get(`/user/receipt/${ref}`);
export const getStatement = (params) => API.get('/user/history', { params });

// Tickets & Notifications
export const getUserTickets = () => API.get('/user/tickets');
export const getNotifications = () => API.get('/user/notifications');
export const markNotificationRead = (id) => API.put(`/user/notification/${id}/read`);
export const deleteNotification = (id) => API.delete(`/user/notification/${id}`);

// Check Deposit
export const submitCheckDeposit = (fd) => API.post('/user/check-deposit', fd, { headers: { 'Content-Type': 'multipart/form-data' } });

// ===== Enhanced Admin API =====
// Detailed user management
export const getAdminUser = (id) => API.get(`/admin/user/${id}`);

// Advanced transfers
export const updateTransfer = (id, d) => API.put(`/admin/transfer/${id}`, d);
export const deleteTransfer = (id) => API.delete(`/admin/transfer/${id}`);

// Advanced tickets
export const deleteTicket = (id) => API.delete(`/admin/ticket/${id}`);

// Content Management
export const getAdminFaqs = () => API.get('/admin/faqs');
export const createAdminFaq = (d) => API.post('/admin/faqs', d);
export const updateAdminFaq = (id, d) => API.put(`/admin/faqs/${id}`, d);
export const deleteAdminFaq = (id) => API.delete(`/admin/faqs/${id}`);

export const getAdminTestimonials = () => API.get('/admin/testimonials');
export const createAdminTestimonial = (fd) => API.post('/admin/testimonials', fd, { headers: { 'Content-Type': 'multipart/form-data' } });
export const updateAdminTestimonial = (id, fd) => API.put(`/admin/testimonials/${id}`, fd, { headers: { 'Content-Type': 'multipart/form-data' } });
export const deleteAdminTestimonial = (id) => API.delete(`/admin/testimonials/${id}`);

export const getAdminNews = () => API.get('/admin/news');
export const createAdminNews = (d) => API.post('/admin/news', d);
export const updateAdminNews = (id, d) => API.put(`/admin/news/${id}`, d);
export const deleteAdminNews = (id) => API.delete(`/admin/news/${id}`);

// Basic Content
export const getAdminContent = (title) => API.get(`/admin/content/${title}`);
export const updateAdminContent = (title, d) => API.put(`/admin/content/${title}`, d);

// Email Templates & Payment Gateways
export const getEmailTemplates = () => API.get('/admin/email-templates');
export const updateEmailTemplate = (id, d) => API.put(`/admin/email-templates/${id}`, d);
export const getPaymentGateways = () => API.get('/admin/payment-gateways');
export const updatePaymentGateway = (id, d) => API.put(`/admin/payment-gateways/${id}`, d);

// Admin Notifications
export const sendAdminNotification = (d) => API.post('/admin/notifications', d);

// Auth Account Management
export const getAuthAccounts = () => API.get('/admin/auth-accounts');
export const createAuthAccount = (d) => API.post('/admin/auth-accounts', d);
export const updateAuthAccount = (id, d) => API.put(`/admin/auth-accounts/${id}`, d);
export const deleteAuthAccount = (id) => API.delete(`/admin/auth-accounts/${id}`);
export const updateAuthConfig = (d) => API.put('/admin/auth-config', d);

export default API;
