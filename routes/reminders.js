const express = require('express');
const auth = require('../middleware/auth');

const router = express.Router();

router.get('/protected', auth, (req, res) => {
    res.json({ msg: 'Access granted', user: req.user });
});

module.exports = router; 
