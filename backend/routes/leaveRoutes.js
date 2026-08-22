const router = require('express').Router();

router.get('/', (req, res) => {
  res.json({ message: 'Leave routes coming soon' });
});

module.exports = router;
