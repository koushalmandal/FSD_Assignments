const mongoose = require('mongoose');

const lostItemSchema = new mongoose.Schema({
  itemName: { type: String, required: true, trim: true, maxlength: 100 },
  category: { type: String, required: true, trim: true, maxlength: 60 },
  description: { type: String, required: true, trim: true, maxlength: 1000 },
  lastSeenLocation: { type: String, required: true, trim: true, maxlength: 150 },
  dateLost: { type: Date, required: true, max: [Date.now, 'Date lost cannot be in the future'] },
  status: { type: String, enum: ['Lost', 'Found'], default: 'Lost' },
  reportedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'Student', required: true }
}, { timestamps: true });

module.exports = mongoose.model('LostItem', lostItemSchema);
