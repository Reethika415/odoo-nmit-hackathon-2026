const router = require('express').Router();
const { protect } = require('../middleware/auth');

router.get('/me', protect, (req, res) => {
  res.json({
    message: 'Attendance fetched successfully',
    attendance: []
  });
});

router.post('/checkin', protect, (req, res) => {
  res.status(201).json({
    message: 'Check-in successful',
    time: new Date()
  });
});

router.post('/checkout', protect, (req, res) => {
  res.status(200).json({
    message: 'Check-out successful',
    time: new Date()
  });
});

module.exports = router;