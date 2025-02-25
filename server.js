const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const cors = require('cors');
const authRoutes = require('./routes/auth');
//const reminderRoutes = require('./routes/reminders');
const reminderRoutes = require('./routes/reminderRoutes');


dotenv.config();
const app = express();

app.use(express.json());
app.use(cors());

app.use('/api/auth', authRoutes);
app.use('/api/users', authRoutes);
app.use('/api/reminders', reminderRoutes);



mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => console.log('MongoDB Connected'))
.catch(err => console.error(err));

app.get('/', (req, res) => {
res.send('Break Reminder API Running...');
});

const PORT = process.env.PORT || 5050;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
app.use(cors());



//mongoose.connect(process.env.MONGO_URI, {
        //useNewUrlParser: true,
        //useUnifiedTopology: true,
    //})
    //.then(() => console.log('MongoDB Connected'))
    //.catch((err) => console.error(err));
