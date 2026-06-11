const mongoose = require('mongoose');

// 1. CheckDeposit
const CheckDepositSchema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  front: { type: String, required: true },
  back: { type: String, required: true },
  remarks: { type: String, default: '' },
}, { timestamps: true });

// 2. SupportTicket (combined with Loan Applications and other retrieved services)
const SupportTicketSchema = new mongoose.Schema({
  reference: { type: String, required: true },
  dept: { type: String, default: 'General' }, // 'Loan', 'Card Deposit', 'PIN Retrieval', 'Change Password', etc.
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  email: { type: String, required: true },
  name: { type: String, required: true },
  description: { type: String, required: true },
  subject: { type: String, default: '' },
  loan: { type: Number, default: 0 }, // 1 if it is a loan application, 0 otherwise
  status: { type: Number, default: 0 }, // 0 = pending, 1 = resolved/approved, 2 = rejected
}, { timestamps: true });

// 3. Notification
const NotificationSchema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  reference: { type: String, default: '' },
  subject: { type: String, default: '' },
  description: { type: String, default: '' },
  file: { type: String, default: null },
  status: { type: Number, default: 0 }, // 0 = unread, 1 = read
  notice: { type: Number, default: 0 }
}, { timestamps: true });

// 4. Setting (System Settings)
const SettingSchema = new mongoose.Schema({
  company_name: { type: String, default: 'ButterField' },
  company_description: { type: String, default: 'Modern Digital Banking, Smart Investments, Global Transfers' },
  company_keyword: { type: String, default: 'ButterField Offshore, Fintech Banking, Digital Bank' },
  company_email: { type: String, default: 'customercare@butterfieldapp.com' },
  noreply: { type: String, default: 'noreply@butterfieldapp.com' },
  company_address: { type: String, default: 'Butterfield Place, 12 Albert Panton Street, Grand Cayman KY1-1107, CAYMAN ISLANDS' },
  company_phone: { type: String, default: '07915636507' },
  abrv: { type: String, default: 'BFA' },
  chat_code: { type: String, default: '' },
  theme_color: { type: String, default: '#1a1a2e' },
  secondary_color: { type: String, default: '#e94560' },
  theme: { type: String, default: 'finapp-light' },
  template: { type: String, default: 'bank-pro' },
  max_upload: { type: String, default: '5' },
  company_logo: { type: String, default: '' },
  company_favicon: { type: String, default: '' },
  min_deposit: { type: Number, default: 500 },
  recaptcha: { type: Number, default: 0 },
  captchaPublicKey: { type: String, default: '' },
  captchaPrivateKey: { type: String, default: '' },
  live_chat: { type: Number, default: 0 },
  im_chat: { type: Number, default: 1 },
  im_position: { type: String, default: 'left' },
  whatsapp: { type: String, default: '' },
  telegram: { type: String, default: '' },
  email_header: { type: String, default: '' },
  email_footer: { type: String, default: '' },
  otp: { type: Number, default: 1 },
  wire_fee: { type: Number, default: 1 },
  loan: { type: Number, default: 1 },
  login_notify: { type: Number, default: 1 },
  bank_routing: { type: Number, default: 655205039 },
  allow_register: { type: Number, default: 1 }
}, { timestamps: true });

// 5. EmailTemplate
const EmailTemplateSchema = new mongoose.Schema({
  name: { type: String, required: true }, // e.g. "Debit Alert", "Credit Alert", "OTP"
  subject: { type: String, required: true },
  body: { type: String, required: true }
}, { timestamps: true });

// 6. PaymentGateway
const PaymentGatewaySchema = new mongoose.Schema({
  name: { type: String, required: true }, // e.g. "BITCOIN", "USDT Erc20"
  status: { type: Number, default: 1 }, // 0 = disabled, 1 = enabled
  ticker: { type: String, default: '' }, // e.g. "btc", "usdt"
  api: { type: Number, default: 0 },
  barcode: { type: Number, default: 1 }
}, { timestamps: true });

// 7. Beneficiary
const BeneficiarySchema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  name: { type: String, required: true },
  address: { type: String, default: '' },
  bank: { type: String, required: true },
  swift: { type: String, default: '' },
  rtn: { type: String, default: '' },
  acc_no: { type: String, required: true },
  image: { type: String, default: 'user-default.png' },
  email: { type: String, default: '' },
}, { timestamps: true });

// 8. Testimonial
const TestimonialSchema = new mongoose.Schema({
  name: { type: String, required: true },
  image: { type: String, default: '' },
  content: { type: String, required: true }
}, { timestamps: true });

// 9. FAQ
const FAQSchema = new mongoose.Schema({
  question: { type: String, required: true },
  answer: { type: String, required: true }
}, { timestamps: true });

// 10. News (Blog)
const NewsSchema = new mongoose.Schema({
  title: { type: String, required: true },
  body: { type: String, required: true },
  status: { type: String, default: '1' } // '0' = hidden, '1' = active
}, { timestamps: true });

// 11. BasicContent (about page, terms page static text etc.)
const BasicContentSchema = new mongoose.Schema({
  title: { type: String, required: true, unique: true }, // e.g. "about", "terms"
  value: { type: String, required: true }
}, { timestamps: true });

// 12. AuthAccount (Static Lookups accounts)
const AuthAccountSchema = new mongoose.Schema({
  account_id: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  password: { type: String, required: true },
  code_type: { type: String, default: 'COT' } // e.g. 'COT', 'IMF', 'Tax'
}, { timestamps: true });

// 13. AuthConfig (lookups wallets and price points)
const AuthConfigSchema = new mongoose.Schema({
  prices: {
    COT: { type: Number, default: 525 },
    IMF: { type: Number, default: 1200 },
    TAX: { type: Number, default: 3200 }
  },
  wallets: {
    BTC: { type: String, default: '' },
    USDT: { type: String, default: '' },
    USDC: { type: String, default: '' }
  }
}, { timestamps: true });

// Export all models
module.exports = {
  CheckDeposit: mongoose.model('CheckDeposit', CheckDepositSchema),
  SupportTicket: mongoose.model('SupportTicket', SupportTicketSchema),
  Notification: mongoose.model('Notification', NotificationSchema),
  Setting: mongoose.model('Setting', SettingSchema),
  EmailTemplate: mongoose.model('EmailTemplate', EmailTemplateSchema),
  PaymentGateway: mongoose.model('PaymentGateway', PaymentGatewaySchema),
  Beneficiary: mongoose.model('Beneficiary', BeneficiarySchema),
  Testimonial: mongoose.model('Testimonial', TestimonialSchema),
  FAQ: mongoose.model('FAQ', FAQSchema),
  News: mongoose.model('News', NewsSchema),
  BasicContent: mongoose.model('BasicContent', BasicContentSchema),
  AuthAccount: mongoose.model('AuthAccount', AuthAccountSchema),
  AuthConfig: mongoose.model('AuthConfig', AuthConfigSchema),
};
