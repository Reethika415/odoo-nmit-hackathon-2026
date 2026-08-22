const router = require('express').Router();
const { protect, adminOnly } = require('../middleware/auth');
const ctrl = require('../controllers/leaveController');

router.post('/', protect, ctrl.applyLeave);
router.get('/me', protect, ctrl.getMyLeaves);
router.get('/all', protect, adminOnly, ctrl.getAllLeaves);
router.put('/:id', protect, adminOnly, ctrl.updateLeaveStatus);

module.exports = router;