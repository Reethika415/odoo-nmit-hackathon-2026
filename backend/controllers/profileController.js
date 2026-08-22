const User = require('../models/User');

exports.getProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');

        if (!user) {
            return res.status(404).json({
                message: 'User not found'
            });
        }

        res.json(user);
    } catch (err) {
        res.status(500).json({
            message: err.message
        });
    }
};

exports.updateProfile = async (req, res) => {
    try {
        const { name, phone, address, profilePicture } = req.body;

        const user = await User.findById(req.user.id);

        if (!user) {
            return res.status(404).json({
                message: 'User not found'
            });
        }

        if (name !== undefined) user.name = name;
        if (phone !== undefined) user.phone = phone;
        if (address !== undefined) user.address = address;
        if (profilePicture !== undefined) user.profilePicture = profilePicture;

        await user.save();

        res.json({
            message: 'Profile updated successfully',
            user: {
                id: user._id,
                employeeId: user.employeeId,
                name: user.name,
                email: user.email,
                role: user.role,
                phone: user.phone,
                address: user.address,
                profilePicture: user.profilePicture,
                jobTitle: user.jobTitle,
                department: user.department,
                salary: user.salary
            }
        });
    } catch (err) {
        res.status(500).json({
            message: err.message
        });
    }
};
