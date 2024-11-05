const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');
const User = require('./models/User');

// Load environment variables
dotenv.config();

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));

const addUser = async () => {
    const users = [
        {
            username: 'user1',
            email: 'user1@example.com',
            password: 'password1', // Replace with plain text password
            role: 'patient',
            profile: {
                progress: 'Good',
                medicines: [],
                recommendedMedicines: [],
                appointments: []
            },
            createdAt: new Date()
        },
        {
            username: 'user2',
            email: 'user2@example.com',
            password: 'password2', // Replace with plain text password
            role: 'patient',
            profile: {
                progress: 'Improving',
                medicines: [],
                recommendedMedicines: [],
                appointments: []
            },
            createdAt: new Date()
        }
    ];

    for (let user of users) {
        // Hash passwords
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, salt);

        // Save user
        const newUser = new User(user);
        await newUser.save();
        console.log(`User ${user.username} added`);
    }

    mongoose.disconnect();
};

addUser();
