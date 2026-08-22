const router = require('express').Router();
const { protect, adminOnly } = require('../middleware/auth');
const ctrl = require('../controllers/payrollController');

router.get('/me', protect, ctrl.getMyPayroll);
router.get('/all', protect, adminOnly, ctrl.getAllPayroll);
router.put('/:id', protect, adminOnly, ctrl.updateSalary);

module.exports = router;
