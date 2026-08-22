const User = require('../models/User');

exports.getMyPayroll = async (req, res) => {
  const user = await User.findById(req.user.id)
    .select('name employeeId salary department jobTitle');

  res.json({
    ...user.toObject(),
    jobTitle: user.jobTitle || 'Software Engineer',
    department: user.department || 'Engineering',
    salary: user.salary || 50000
  });
};

exports.getAllPayroll = async (req, res) => {
  const users = await User.find()
    .select('name employeeId salary department jobTitle');

  res.json(users.map(user => ({
    ...user.toObject(),
    jobTitle: user.jobTitle || 'Software Engineer',
    department: user.department || 'Engineering',
    salary: user.salary || 50000
  })));
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