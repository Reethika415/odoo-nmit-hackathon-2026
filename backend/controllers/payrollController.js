const User = require('../models/User');

exports.getMyPayroll = async (req, res) => {
  try {
    const user = await User.findById(req.user.id)
      .select('name employeeId salary department jobTitle');

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({
      name: user.name,
      employeeId: user.employeeId,
      jobTitle: user.jobTitle || 'Software Engineer',
      department: user.department || 'Engineering',
      salary: user.salary || 50000
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getAllPayroll = async (req, res) => {
  const users = await User.find()
    .select('name employeeId salary department jobTitle');

  res.json(users);
};

exports.updateSalary = async (req, res) => {
  const { salary } = req.body;

  const user = await User.findByIdAndUpdate(
    req.params.id,
    { salary },
    { new: true }
  ).select('-password');

  res.json(user);
};