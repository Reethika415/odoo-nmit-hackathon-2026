const Attendance = require('../models/Attendance');

exports.checkIn = async (req, res) => {
  try {
    const record = await Attendance.create({
      employee: req.user.id,
      date: new Date(),
      checkIn: new Date(),
      status: 'Present'
    });

    res.status(201).json(record);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.checkOut = async (req, res) => {
  try {
    const record = await Attendance.findOneAndUpdate(
      {
        employee: req.user.id,
        date: {
          $gte: new Date().setHours(0, 0, 0, 0)
        }
      },
      {
        checkOut: new Date()
      },
      {
        new: true
      }
    );

    if (!record) {
      return res.status(404).json({
        message: 'No check-in record found for today'
      });
    }

    res.json(record);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getMyAttendance = async (req, res) => {
  try {
    const records = await Attendance.find({
      employee: req.user.id
    }).sort({ date: -1 });

    res.json(records);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getAllAttendance = async (req, res) => {
  try {
    const records = await Attendance.find()
      .populate('employee', 'name employeeId');

    res.json(records);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
