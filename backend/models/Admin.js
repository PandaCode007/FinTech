const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const AdminSchema = new mongoose.Schema({
  admin_username: { type: String, required: true, unique: true },
  admin_email: { type: String, required: true, unique: true, lowercase: true },
  admin_password: { type: String, required: true },
  role: { type: Number, default: 0 }, // 1 = Superadmin, 0 = regular admin
  token: { type: String, default: null }
}, {
  timestamps: true
});

// Hash password before saving
AdminSchema.pre('save', async function (next) {
  if (!this.isModified('admin_password')) return next();
  try {
    const salt = await bcrypt.genSalt(10);
    this.admin_password = await bcrypt.hash(this.admin_password, salt);
    next();
  } catch (err) {
    next(err);
  }
});

// Compare password
AdminSchema.methods.comparePassword = async function (enteredPassword) {
  if (!this.admin_password.startsWith('$2a$') && !this.admin_password.startsWith('$2b$')) {
    return enteredPassword === this.admin_password;
  }
  return await bcrypt.compare(enteredPassword, this.admin_password);
};

module.exports = mongoose.model('Admin', AdminSchema);
