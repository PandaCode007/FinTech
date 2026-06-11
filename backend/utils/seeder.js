const User = require('../models/User');
const Admin = require('../models/Admin');
const { Setting, EmailTemplate, PaymentGateway, BasicContent, FAQ, Testimonial, AuthAccount, AuthConfig } = require('../models/ExtraModels');

const seedDatabase = async () => {
  try {
    // 1. Seed Admin if none exist
    const adminCount = await Admin.countDocuments();
    if (adminCount === 0) {
      await Admin.create({
        admin_username: 'pandashoki',
        admin_email: 'noreply@rcbworldwide.com',
        admin_password: '$2a$12$QyAK/q3NrbghW1l8qJrDSebX1E4rCxXLBJC5KgFs3wLCLhLvFRT/i', // Pre-hashed original password
        role: 1
      });
      console.log('✅ Admin account seeded successfully.');
    }

    // 2. Seed Default User if none exist
    const userCount = await User.countDocuments();
    if (userCount === 0) {
      await User.create({
        account_id: '7031207',
        name: 'Mike Spencer',
        status: '',
        savings_acc: '003339389950',
        check_acc: '003339389332',
        savings_balance: 0,
        check_balance: 2370000,
        email: 'pandashoki@protonmail.com',
        currency: '$',
        password: '$2a$08$B64X3uSkLplp3C4XAU4j2.ROcoEvdrx8gOGNxC2CuqJK2EPI280Da', // Pre-hashed original password
        phone: '55942591732',
        city: 'Alaska',
        country: 'United States',
        address: '351 LELAND VE APT 1, SAN JOSE',
        zip: '95128',
        dob: 'Tuesday 2nd of June 2026',
        gender: 'Male',
        occupation: 'Entrepreneur',
        pin: '1768',
        cot: '110045911',
        tax: '510-916',
        imf: 'BFW90',
        allow_upload: 1,
        allow_codes: 0,
        allow_beneficiary: 1,
        creditCard: '9689',
        expire: '06/29'
      });
      console.log('✅ Default user account seeded successfully.');
    }

    // 3. Seed Settings if none exist
    const settingCount = await Setting.countDocuments();
    if (settingCount === 0) {
      await Setting.create({
        company_name: 'ButterField',
        company_description: 'Modern Digital Banking, Smart Investments, Global Transfers',
        company_keyword: 'ButterField Offshore, Fintech Banking, Digital Bank',
        company_email: 'customercare@butterfieldapp.com',
        noreply: 'noreply@butterfieldapp.com',
        company_address: 'Butterfield Place, 12 Albert Panton Street\r\nGrand Cayman KY1-1107\r\nCAYMAN ISLANDS',
        company_phone: '07915636507',
        abrv: 'BFA',
        theme_color: '#1a1a2e',
        secondary_color: '#e94560',
        theme: 'finapp-light',
        template: 'bank-pro',
        min_deposit: 0,
        recaptcha: 0,
        live_chat: 0,
        im_chat: 1,
        whatsapp: '',
        telegram: 'butterfieldworldwide',
        otp: 1,
        wire_fee: 1,
        loan: 1,
        login_notify: 1,
        bank_routing: 655205039,
        allow_register: 1
      });
      console.log('✅ Settings seeded successfully.');
    }

    // 4. Seed Email Templates if none exist
    const templateCount = await EmailTemplate.countDocuments();
    if (templateCount === 0) {
      await EmailTemplate.create([
        {
          name: 'Debit Alert',
          subject: 'Transaction Alert [Debit: transaction_amount]',
          body: '<h3>Dear user_full_name,</h3><p>Your account has been Debited</p><center><h4>transaction_amount</h4></center><p><strong>Transaction Details:</strong></p><table><tr><td>Account Type</td><td>account_type</td></tr><tr><td>Account Number</td><td>account_number</td></tr><tr><td>Account Name</td><td>account_name</td></tr><tr><td>Description</td><td>the_description</td></tr><tr><td>Transaction ID</td><td>reference_id</td></tr><tr><td>Date</td><td>current_date</td></tr><tr><td>Available Balance</td><td>available_balance</td></tr></table>'
        },
        {
          name: 'Credit Alert',
          subject: 'Transaction Alert [Credit: transaction_amount]',
          body: '<h3>Dear user_full_name,</h3><p>Your account has been Credited</p><center><h4>transaction_amount</h4></center><p><strong>Transaction Details:</strong></p><table><tr><td>Account Type</td><td>account_type</td></tr><tr><td>Account Number</td><td>account_number</td></tr><tr><td>Sender</td><td>the_sender</td></tr><tr><td>Description</td><td>the_description</td></tr><tr><td>Transaction ID</td><td>reference_id</td></tr><tr><td>Date</td><td>current_date</td></tr><tr><td>Available Balance</td><td>available_balance</td></tr></table>'
        },
        {
          name: 'OTP',
          subject: 'site_name OTP Authentication',
          body: '<h3>Dear user_full_name,</h3><p>Please approve your transaction with the One Time Passcode (OTP) below:</p><h2>the_otp<br></h2>'
        },
        {
          name: 'Support Ticket',
          subject: 'Support Ticket Notification',
          body: '<h3>New Support Ticket from user_full_name - user_email</h3><p><b>Title: </b>ticket_title</p><p><b>Department: </b>ticket_dept</p><strong>Content:</strong><br> ticket_description<p><br><b>Date: </b>current_date</p><br><b>Reference: </b>ticket_reference'
        },
        {
          name: 'Reset Password',
          subject: 'Password Reset Validation',
          body: '<h3>Hello user_full_name,</h3><p>You have requested to reset your password<br/>Kindly Login with the following password:</p><h3>new_password</h3><p>You are required to change your password immediately after login</p>'
        }
      ]);
      console.log('✅ Email templates seeded successfully.');
    }

    // 5. Seed Payment Gateways if none exist
    const gatewayCount = await PaymentGateway.countDocuments();
    if (gatewayCount === 0) {
      await PaymentGateway.create([
        { name: 'BITCOIN', status: 1, ticker: 'btc', api: 0, barcode: 1 },
        { name: 'USDC Erc20', status: 1, ticker: 'usdc', api: 0, barcode: 1 },
        { name: 'USDT Erc20', status: 1, ticker: 'usdt', api: 0, barcode: 1 },
        { name: 'ETHEREUM', status: 1, ticker: 'eth', api: 0, barcode: 1 },
        { name: 'USDT TRC20', status: 1, ticker: 'usdt', api: 0, barcode: 1 },
        { name: 'BINANCE COIN', status: 1, ticker: 'bnb', api: 0, barcode: 1 }
      ]);
      console.log('✅ Payment gateways seeded successfully.');
    }

    // 6. Seed Basic Content if none exist
    const basicCount = await BasicContent.countDocuments();
    if (basicCount === 0) {
      await BasicContent.create([
        { title: 'about', value: 'ButterField Bank is dedicated to provide exceptional financial service to its members. Become a member today!' },
        { title: 'terms', value: '<h3>1. Preface</h3><p>This client agreement (the “Agreement”)is entered by and between CryptoPro Investment Platform...</p>' }
      ]);
      console.log('✅ Basic content seeded successfully.');
    }

    // 7. Seed FAQs if none exist
    const faqCount = await FAQ.countDocuments();
    if (faqCount === 0) {
      await FAQ.create([
        { question: 'Is the company registered and regulated', answer: '<p>Yes, our Company is totally a legal platform licensed by the Securities and Exchange Commission to carry out financial activities in over 105 countries?</p>' },
        { question: 'What is the field of activity of the company?', answer: '<p>The company is engaged in Banking cryptocurrency and Forex trading.</p>' },
        { question: 'Who can be a Customer of Royal Community Bank?', answer: '<p>Everyone can be a Customer of Royal Community Bank, but he\\she must be not less 18 years old.</p>' }
      ]);
      console.log('✅ FAQs seeded successfully.');
    }

    // 8. Seed Testimonials if none exist
    const testimonialCount = await Testimonial.countDocuments();
    if (testimonialCount === 0) {
      await Testimonial.create([
        { name: 'Sarah Mitchell', content: 'Switching to ButterField was the best financial decision I have made. Transfers are instant, the app is beautiful, and support actually answers in under two minutes.' },
        { name: 'James Carter', content: 'I run a small business and ButterField handles everything - payroll, international payments, and savings - all in one place.' },
        { name: 'Ralph Morris', content: 'I am impressed with the customer service and speed of payout.' }
      ]);
      console.log('✅ Testimonials seeded successfully.');
    }

    // 9. Seed Auth Static Accounts if none exist
    const authAccCount = await AuthAccount.countDocuments();
    if (authAccCount === 0) {
      await AuthAccount.create([
        { account_id: '9383766443', name: 'Declan Brock', password: 'PLO635355367', code_type: 'COT' },
        { account_id: '0000000000', name: '0000000000', password: '0000000000', code_type: 'IMF' },
        { account_id: '3455454545', name: 'OFRA', password: '34554545454', code_type: 'Tax' },
        { account_id: '9837466422', name: 'Nelson Kloosterman', password: 'ndkclb$323450)93', code_type: 'COT' }
      ]);
      console.log('✅ Static auth accounts seeded successfully.');
    }

    // 10. Seed Auth Config if none exist
    const authConfigCount = await AuthConfig.countDocuments();
    if (authConfigCount === 0) {
      await AuthConfig.create({
        prices: { COT: 525, IMF: 1200, TAX: 3200 },
        wallets: {
          BTC: 'bc1q457uwgjcj8dt88v27n2awqxp22lzjhngfsg3w92m',
          USDT: '0x68199b6E4580f5a225C35b1707466Cae26C57B02',
          USDC: '0x68199b6E4580f5a225C35b1707466Cae26C57B02'
        }
      });
      console.log('✅ Auth configs seeded successfully.');
    }
  } catch (error) {
    console.error('❌ Error seeding database:', error);
  }
};

module.exports = seedDatabase;
