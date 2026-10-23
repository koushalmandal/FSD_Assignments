const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  fullName: { type: String, required: true, trim: true, minlength: 2, maxlength: 100 },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
    match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Enter a valid college email address']
  },
  department: { type: String, required: true, trim: true, maxlength: 100 },
  contactNumber: { type: String, required: true, trim: true, match: [/^[+\d][\d\s()-]{6,19}$/, 'Enter a valid contact number'] }
}, { timestamps: true });

module.exports = mongoose.model('Student', studentSchema);
