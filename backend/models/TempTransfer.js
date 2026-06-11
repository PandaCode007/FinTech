const mongoose = require('mongoose');

const TempTransferSchema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  amount: { type: Number, required: true },
  bank_name: { type: String, default: '' },
  bank_address: { type: String, default: '' },
  sender_id: { type: String, default: '' },
  sender_acc: { type: String, default: '' },
  reference: { type: String, required: true },
  receiver_name: { type: String, default: '' },
  receiver_acc: { type: String, default: '' },
  type: { type: String, default: 'Debit' }, // 'Debit' or 'Credit'
  swift: { type: String, default: '' },
  routing: { type: String, default: '' },
  remarks: { type: String, default: '' },
  status: { type: String, default: 'Pending' }, // Pending, COT, IMF, TAX, Completed, etc.
  balance: { type: Number, default: 0 },
  month: { type: String, default: '' },
}, {
  timestamps: true
});

module.exports = mongoose.model('TempTransfer', TempTransferSchema);
