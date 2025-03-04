const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const User = require('../models/User');

module.exports = async (req, res, next) => {
    try {
        const token = req.header('Authorization')?.replace('Bearer ', '');
        console.log(" Token Received:", token);

        if (!token) {
            return res.status(401).json({ message: "No token provided" });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log(" Decoded Token:", decoded);

        if (!mongoose.Types.ObjectId.isValid(decoded.id)) {
            return res.status(400).json({ message: "Invalid User ID format" });
        }

        const user = await User.findById(decoded.id);
        console.log(" User Found:", user);

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        req.user = user;
        next();
    } catch (error) {
        console.error(" Authentication Error:", error);
        res.status(401).json({ message: "Unauthorized" });
    }
};

