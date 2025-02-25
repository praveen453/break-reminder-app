const express = require('express');
const router = express.Router();
const User = require('../models/User');
const authMiddleware = require('../middleware/auth'); // ✅ Protect routes with JWT authentication

// ✅ Get all reminders for the logged-in user
router.get('/', authMiddleware, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('reminders');
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(user.reminders);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// ✅ Create a new reminder for the logged-in user
router.post('/', authMiddleware, async (req, res) => {
    const { time, message } = req.body;

    try {
        const user = await User.findById(req.user.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        user.reminders.push({ time, message });
        await user.save();
        res.status(201).json({ message: 'Reminder added successfully', reminders: user.reminders });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;

