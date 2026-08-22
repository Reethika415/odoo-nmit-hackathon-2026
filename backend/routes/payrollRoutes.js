const router = require('express').Router();

router.get('/', (req, res) => {
  res.json({ message: 'Payroll routes coming soon' });
});

module.exports = router;
