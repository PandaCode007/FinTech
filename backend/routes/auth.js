const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const Admin = require('../models/Admin');
const { Setting } = require('../models/ExtraModels');

const JWT_SECRET = process.env.JWT_SECRET || 'fintech-super-secret-key-12345';

// Helper: Generate unique account information
const generateRoutingDetails = () => {
  const account_id = Math.floor(1000000 + Math.random() * 9000000).toString(); // 7-digit
  const savings_acc = '00' + Math.floor(1000000000 + Math.random() * 9000000000).toString(); // 12-digit
  const check_acc = '00' + Math.floor(1000000000 + Math.random() * 9000000000).toString(); // 12-digit
  const cot = '1100' + Math.floor(10000 + Math.random() * 90000).toString();
  const tax = Math.floor(100 + Math.random() * 900).toString() + '-' + Math.floor(100 + Math.random() * 900).toString();
  const imf = 'BFA' + Math.floor(10 + Math.random() * 90).toString();
  return { account_id, savings_acc, check_acc, cot, tax, imf };
};

// @route   POST /api/auth/register
// @desc    Register a new banking customer
router.post('/register', async (req, res) => {
  const { name, email, password, phone, gender, city, country, address, zip, dob, occupation, pin } = req.body;

  try {
    // Check if user already exists
    let existingUser = await User.findOne({ email: email.toLowerCase() });
    if (existingUser) {
      return res.status(400).json({ message: 'Email already registered.' });
    }

    const { account_id, savings_acc, check_acc, cot, tax, imf } = generateRoutingDetails();

    const newUser = new User({
      account_id,
      name,
      email: email.toLowerCase(),
      password, // Will be auto-hashed by User model schema pre-save
      phone,
      gender,
      city,
      country,
      address,
      zip,
      dob,
      occupation,
      pin,
      savings_acc,
      check_acc,
      cot,
      tax,
      imf,
      status: 'Active',
      savings_balance: 0,
      check_balance: 0
    });

    await newUser.save();

    // Create JWT Token
    const token = jwt.sign({ user_id: newUser._id, role: 'user' }, JWT_SECRET, { expiresIn: '2h' });

    res.status(201).json({
      message: 'Account registered successfully.',
      token,
      user: {
        id: newUser._id,
        account_id: newUser.account_id,
        name: newUser.name,
        email: newUser.email,
        savings_acc: newUser.savings_acc,
        check_acc: newUser.check_acc
      }
    });

  } catch (error) {
    console.error('Registration Error:', error);
    res.status(500).json({ message: 'Internal Server Error. Please try again.' });
  }
});

// @route   POST /api/auth/login
// @desc    Authenticate User & get token
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials. User not found.' });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials. Password incorrect.' });
    }

    // Get system settings to see if OTP is required for login
    const systemSetting = await Setting.findOne();
    const otpRequired = systemSetting ? systemSetting.otp === 1 : false;

    if (otpRequired) {
      // Generate OTP and save to user
      const generatedOtp = Math.floor(100000 + Math.random() * 900000).toString();
      user.otp = generatedOtp;
      await user.save();

      // In real-world, send email here. In our converter, we will return the OTP so it's super easy to login and test!
      console.log(`🔑 Login OTP generated for ${user.email}: ${generatedOtp}`);

      return res.status(200).json({
        otpRequired: true,
        email: user.email,
        message: 'OTP verification code sent to your registered email.'
      });
    }

    // Direct Login (No OTP required)
    const token = jwt.sign({ user_id: user._id, role: 'user' }, JWT_SECRET, { expiresIn: '2h' });

    res.status(200).json({
      token,
      user: {
        id: user._id,
        account_id: user.account_id,
        name: user.name,
        email: user.email,
        savings_balance: user.savings_balance,
        check_balance: user.check_balance,
        currency: user.currency,
        status: user.status
      }
    });

  } catch (error) {
    console.error('Login Error:', error);
    res.status(500).json({ message: 'Internal Server Error.' });
  }
});

// @route   POST /api/auth/verify-otp-login
// @desc    Verify OTP for login completion
router.post('/verify-otp-login', async (req, res) => {
  const { email, otp } = req.body;

  try {
    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user || user.otp !== otp) {
      return res.status(400).json({ message: 'Invalid OTP code. Please try again.' });
    }

    // OTP matched! Reset user's OTP
    user.otp = null;
    await user.save();

    const token = jwt.sign({ user_id: user._id, role: 'user' }, JWT_SECRET, { expiresIn: '2h' });

    res.status(200).json({
      token,
      user: {
        id: user._id,
        account_id: user.account_id,
        name: user.name,
        email: user.email,
        savings_balance: user.savings_balance,
        check_balance: user.check_balance,
        currency: user.currency,
        status: user.status
      }
    });

  } catch (error) {
    console.error('OTP Verification Error:', error);
    res.status(500).json({ message: 'Internal Server Error.' });
  }
});

// @route   POST /api/auth/admin/login
// @desc    Admin login
router.post('/admin/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const admin = await Admin.findOne({ admin_username: username });
    if (!admin) {
      return res.status(400).json({ message: 'Invalid Admin Credentials.' });
    }

    const isMatch = await admin.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid Admin Credentials.' });
    }

    const token = jwt.sign({ admin_id: admin._id, role: 'admin' }, JWT_SECRET, { expiresIn: '4h' });

    res.status(200).json({
      token,
      admin: {
        id: admin._id,
        username: admin.admin_username,
        email: admin.admin_email,
        role: admin.role
      }
    });

  } catch (error) {
    console.error('Admin Login Error:', error);
    res.status(500).json({ message: 'Internal Server Error.' });
  }
});

module.exports = router;
