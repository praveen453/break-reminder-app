const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const router = express.Router();



router.post("/register", async (req, res) => {
    try {
      const { name, email, password } = req.body;
  
 
      if (!name || !email || !password) {
        return res.status(400).json({ msg: "All fields are required!" });
      }
  
 
      let user = await User.findOne({ email });
      if (user) {
        console.log(` User already exists: ${email}`);
        return res.status(400).json({ msg: "User already exists" });
      }
  
   
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
  
    
      user = new User({ name, email, password: hashedPassword });
      await user.save();
      console.log(` User Registered: ${user.email}`);
  
  
      const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
        expiresIn: "1h",
      });
  
     
      res.status(201).json({ token, user });
    } catch (error) {
      console.error(" Registration Error:", error.message);
      res.status(500).json({ msg: "Server Error", error: error.message });
    }
  });


router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
       
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ msg: 'Invalid credentials' });

        
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ msg: 'Invalid credentials' });

   
        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });


        res.json({ token, user });
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;