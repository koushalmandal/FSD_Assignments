const mongoose = require('mongoose');

const foundItemSchema = new mongoose.Schema({
  itemName: { type: String, required: true, trim: true, maxlength: 100 },
  category: { type: String, required: true, trim: true, maxlength: 60 },
  description: { type: String, required: true, trim: true, maxlength: 1000 },
  foundLocation: { type: String, required: true, trim: true, maxlength: 150 },
  dateFound: { type: Date, required: true, max: [Date.now, 'Date found cannot be in the future'] },
  status: { type: String, enum: ['Available', 'Returned'], default: 'Available' },
  reportedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'Student', required: true }
}, { timestamps: true });

module.exports = mongoose.model('FoundItem', foundItemSchema);
