const router = require('express').Router();
const { protect, adminOnly } = require('../middleware/auth');
const { getSummary } = require('../controllers/reportsController');

router.get('/summary', protect, adminOnly, getSummary);

module.exports = router;