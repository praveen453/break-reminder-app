const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    reminders: [{ time: String, message: String }]
});

module.exports = mongoose.model('User', UserSchema); 
