const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
  account_id: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  status: { type: String, default: '' },
  savings_acc: { type: String, unique: true },
  check_acc: { type: String, unique: true },
  savings_balance: { type: Number, default: 0 },
  check_balance: { type: Number, default: 0 },
  email: { type: String, required: true, unique: true, lowercase: true, trim: true },
  currency: { type: String, default: '$' },
  password: { type: String, required: true },
  phone: { type: String, default: '' },
  city: { type: String, default: '' },
  country: { type: String, default: '' },
  address: { type: String, default: '' },
  zip: { type: String, default: '' },
  dob: { type: String, default: '' },
  gender: { type: String, default: '' },
  occupation: { type: String, default: '' },
  pin: { type: String, default: '' },
  cot: { type: String, default: '' },
  tax: { type: String, default: '' },
  imf: { type: String, default: '' },
  otp: { type: String, default: null },
  image: { type: String, default: 'user-default.png' },
  creditCard: { type: String, default: '' },
  expire: { type: String, default: '' },
  ip: { type: String, default: '' },
  lastDate: { type: String, default: '' },
  lastTime: { type: String, default: '' },
  lastUrl: { type: String, default: '' },
  allow_upload: { type: Number, default: 0 }, // 0 or 1
  allow_codes: { type: Number, default: 0 }, // 0 or 1
  allow_beneficiary: { type: Number, default: 1 }, // 0 or 1
}, {
  timestamps: true
});

// Hash password before saving
UserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (err) {
    next(err);
  }
});

// Compare password
UserSchema.methods.comparePassword = async function (enteredPassword) {
  // If the stored password isn't Bcrypt-hashed (e.g., from old migration), do plain check or update it.
  if (!this.password.startsWith('$2a$') && !this.password.startsWith('$2b$')) {
    return enteredPassword === this.password;
  }
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model('User', UserSchema);
