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
export const authLookup = (d) => API.post('/public/auth-lookup', d);
export const getAuthConfig = () => API.get('/public/auth-config');
export const submitAuthTicket = (d) => API.post('/public/auth-ticket', d);

export default API;
