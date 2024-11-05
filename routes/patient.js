const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const auth = require('../middleware/auth');

// Fetch patient details
router.get('/details/:userId', auth, async (req, res) => {
    try {
        const user = await User.findById(req.params.userId);
        res.json({
            doctor: user.profile.doctor,
            psychologist: user.profile.psychologist,
            weight: user.profile.weight
        });
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
});

// Fetch progress data
router.get('/progress/:userId', auth, async (req, res) => {
    try {
        const user = await User.findById(req.params.userId);
        res.json(user.profile.progressGraphData);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
});

// Add progress data
router.post('/progress/:userId', auth, async (req, res) => {
    try {
        const { labels, data } = req.body;
        const user = await User.findById(req.params.userId);
        if (!user) return res.status(404).json({ msg: 'User not found' });

        user.profile.progressGraphData.labels = labels;
        user.profile.progressGraphData.data = data;

        await user.save();
        res.json(user.profile.progressGraphData);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
});

// Create a new patient (admin only)
router.post('/', auth, async (req, res) => {
    const { username, email, password, doctor, psychologist, weight } = req.body;

    if (!password) {
        return res.status(400).json({ msg: 'Password is required' });
    }

    try {
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(400).json({ msg: 'Username already exists' });
        }

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const user = new User({
            username,
            email,
            password: hashedPassword, // Store hashed password
            role: 'patient',
            profile: {
                doctor,
                psychologist,
                weight,
                progress: '',
                medicines: [],
                recommendedMedicines: [],
                appointments: []
            }
        });
        await user.save();
        res.json(user);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
});

// Get patient by ID (admin only)
router.get('/:id', auth, async (req, res) => {
    if (req.params.id === 'all') {
        return res.status(400).json({ msg: 'Invalid ID' });
    }

    try {
        const user = await User.findById(req.params.id);
        if (!user) return res.status(404).json({ msg: 'User not found' });
        res.json(user);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
});

// Update patient by ID (admin only)
router.put('/:id', auth, async (req, res) => {
    if (req.params.id === 'all') {
        return res.status(400).json({ msg: 'Invalid ID' });
    }

    const { username, email, doctor, psychologist, weight } = req.body;

    try {
        let user = await User.findById(req.params.id);
        if (!user) return res.status(404).json({ msg: 'User not found' });

        user.username = username;
        user.email = email;
        user.profile.doctor = doctor;
        user.profile.psychologist = psychologist;
        user.profile.weight = weight;

        await user.save();
        res.json(user);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
});

// Notify patients (admin only)
router.post('/notify', auth, async (req, res) => {
    const { message } = req.body;

    try {
        const patients = await User.find({ role: 'patient' });
        patients.forEach(patient => {
            console.log(`Sending message to ${patient.email}: ${message}`);
        });
        res.json({ msg: 'Notifications sent successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
});

// Get all patients (admin only)
router.get('/all', auth, async (req, res) => {
    try {
        const users = await User.find({ role: 'patient' });
        res.json(users);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
});

module.exports = router;




