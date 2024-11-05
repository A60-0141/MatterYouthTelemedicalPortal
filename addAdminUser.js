const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');
const User = require('./models/User');

dotenv.config();

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));

const addAdminUser = async () => {
    const adminUser = {
        username: 'Navilee',
        email: 'endedenaville@gmail.com',
        password: '10037%Navi%', // You may want to replace this with a secure password
        role: 'admin',
        profile: {
            progress: 'Excellent',
            medicines: [],
            recommendedMedicines: [],
            appointments: []
        },
        createdAt: new Date()
    };

    // Hash password
    const salt = await bcrypt.genSalt(10);
    adminUser.password = await bcrypt.hash(adminUser.password, salt);

    // Save user
    const newUser = new User(adminUser);
    await newUser.save();
    console.log(`Admin user ${adminUser.username} added`);

    mongoose.disconnect();
};

addAdminUser();
