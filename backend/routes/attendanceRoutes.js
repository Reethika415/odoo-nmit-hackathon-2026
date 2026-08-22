const router = require('express').Router();

const { protect, adminOnly } = require('../middleware/auth');
const ctrl = require('../controllers/attendanceController');

router.post('/checkin', protect, ctrl.checkIn);
router.post('/checkout', protect, ctrl.checkOut);

router.get('/me', protect, ctrl.getMyAttendance);

router.get('/all', protect, adminOnly, ctrl.getAllAttendance);

module.exports = router;