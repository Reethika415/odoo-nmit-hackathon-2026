const router = require('express').Router();
const { protect } = require('../middleware/auth');

let attendanceRecords = [];

router.get('/me', protect, (req, res) => {
  const records = attendanceRecords.filter(
    record => record.userId === req.user.id
  );

  res.json({
    message: 'Attendance fetched successfully',
    attendance: records
  });
});

router.post('/checkin', protect, (req, res) => {
  const record = {
    _id: Date.now().toString(),
    userId: req.user.id,
    date: new Date(),
    status: 'Present'
  };

  attendanceRecords.push(record);

  res.status(201).json({
    message: 'Check-in successful',
    attendance: record
  });
});

router.post('/checkout', protect, (req, res) => {
  res.status(200).json({
    message: 'Check-out successful',
    time: new Date()
  });
});

module.exports = router;