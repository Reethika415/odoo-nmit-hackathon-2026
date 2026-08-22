const Leave = require('../models/Leave');

exports.applyLeave = async (req, res) => {
  const { leaveType, startDate, endDate, remarks } = req.body;
  const leave = await Leave.create({ employee: req.user.id, leaveType, startDate, endDate, remarks });
  res.status(201).json(leave);
};

exports.getMyLeaves = async (req, res) => {
  const leaves = await Leave.find({ employee: req.user.id }).sort({ createdAt: -1 });
  res.json(leaves);
};

exports.getAllLeaves = async (req, res) => {
  const leaves = await Leave.find().populate('employee', 'name employeeId');
  res.json(leaves);
};

exports.updateLeaveStatus = async (req, res) => {
  const { status, adminComment } = req.body;
  const leave = await Leave.findByIdAndUpdate(req.params.id, { status, adminComment }, { new: true });
  res.json(leave);
};
