const Attendance = require('../models/Attendance');
const Leave = require('../models/Leave');

exports.getSummary = async (req, res) => {
  try {
    const attendanceCounts = await Attendance.aggregate([
      { $group: { _id: '$status', count: { $sum: 1 } } },
    ]);
    const leaveCounts = await Leave.aggregate([
      { $group: { _id: '$status', count: { $sum: 1 } } },
    ]);
    res.json({ attendanceCounts, leaveCounts });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};