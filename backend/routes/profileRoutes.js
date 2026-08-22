const router = require('express').Router();
const { protect } = require('../middleware/auth');
const ctrl = require('../controllers/profileController');

router.get('/', protect, ctrl.getProfile);

module.exports = router;