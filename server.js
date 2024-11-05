const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const http = require('http');
const { Server } = require('socket.io');
const { notify } = require('./services/notificationService'); // Import the notification service
const User = require('./models/User'); // Import User model
const Message = require('./models/Message'); // Import Message model
dotenv.config();

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"]
    }
});

const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Welcome to the Hospital Portal API');
});

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));

// Define Routes
const authRoutes = require('./routes/auth');
app.use('/api/auth', authRoutes);

const profileRoutes = require('./routes/profile');
const medicineRoutes = require('./routes/medicine');
app.use('/api/profile', profileRoutes);
app.use('/api/medicine', medicineRoutes);

const chatRoutes = require('./routes/chat');
app.use('/api/chat', chatRoutes);

const appointmentRoutes = require('./routes/appointment');
app.use('/api/appointment', appointmentRoutes);

const patientRoutes = require('./routes/patient');
app.use('/api/patient', patientRoutes);

const telemedicineRoutes = require('./routes/telemedicine');
app.use('/api/telemedicine', telemedicineRoutes);

// Add protected route
const protectedRoutes = require('./routes/protected');
app.use('/api/protected', protectedRoutes);

// Handle documents
// const documentRoutes = require('./routes/document');
// app.use('/api/document', documentRoutes);

io.on('connection', (socket) => {
    socket.on('username', async (username) => {
        try {
            let user = await User.findOne({ username });
            if (!user) {
                user = new User({ username, email: 'example@example.com', password: 'password' }); // Placeholder email and password
                await user.save();
            }
            socket.username = username;
            const activeUsers = await User.find({});
            io.emit('activeUsers', activeUsers.map(user => user.username));
        } catch (err) {
            console.error(err);
        }
    });

    socket.on('message', async (msg) => {
        try {
            const user = await User.findOne({ username: msg.username });
            const message = new Message({ sender: user._id, content: msg.text, timestamp: new Date() });
            await message.save();
            io.emit('message', msg);
        } catch (err) {
            console.error(err);
        }
    });

    socket.on('disconnect', async () => {
        const username = socket.username;
        const activeUsers = await User.find({});
        io.emit('activeUsers', activeUsers.map(user => user.username));
    });

    console.log('a user connected');
    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
});

server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
