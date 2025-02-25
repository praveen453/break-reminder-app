const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const router = express.Router();


// Register User
router.post("/register", async (req, res) => {
    try {
      const { name, email, password } = req.body;
  
      // ✅ Validate input
      if (!name || !email || !password) {
        return res.status(400).json({ msg: "All fields are required!" });
      }
  
      // ✅ Check if user already exists
      let user = await User.findOne({ email });
      if (user) {
        console.log(`⚠️ User already exists: ${email}`);
        return res.status(400).json({ msg: "User already exists" });
      }
  
      // ✅ Hash the password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
  
      // ✅ Create new user
      user = new User({ name, email, password: hashedPassword });
      await user.save();
      console.log(`✅ User Registered: ${user.email}`);
  
      // ✅ Generate JWT token
      const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
        expiresIn: "1h",
      });
  
      // ✅ Respond with token and user details
      res.status(201).json({ token, user });
    } catch (error) {
      console.error("❌ Registration Error:", error.message);
      res.status(500).json({ msg: "Server Error", error: error.message });
    }
  });

// Login User
router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        // Check if user exists
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ msg: 'Invalid credentials' });

        // Compare password with hashed password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ msg: 'Invalid credentials' });

        // Generate JWT token
        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        // Respond with token and user details
        res.json({ token, user });
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;