const mongoose = require('mongoose');

const TransactionSchema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: false },
  name: { type: String, default: '' },
  email: { type: String, default: '' },
  status: { type: String, default: 'Pending' },
  coin_type: { type: String, default: '' },
  coin_id: { type: String, default: '' },
  transaction_type: { type: String, default: '' },
  amount: { type: Number, required: true },
  reference: { type: String, required: true },
  token: { type: String, default: null },
}, {
  timestamps: true
});

module.exports = mongoose.model('Transaction', TransactionSchema);
