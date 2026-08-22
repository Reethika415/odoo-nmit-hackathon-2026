const getProfile = async (req, res) => {
  try {
    res.json(req.user);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch profile' });
  }
};

module.exports = { getProfile };
