const mongoose = require('mongoose');

const leaveSchema = new mongoose.Schema({
  employee: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  leaveType: { type: String, enum: ['Paid', 'Sick', 'Unpaid'], required: true },
  startDate: Date,
  endDate: Date,
  remarks: String,
  status: { type: String, enum: ['Pending', 'Approved', 'Rejected'], default: 'Pending' },
  adminComment: String,
}, { timestamps: true });

module.exports = mongoose.model('Leave', leaveSchema);