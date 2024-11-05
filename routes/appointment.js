const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Appointment = require('../models/Appointment');

// Book an appointment
router.post('/book', auth, async (req, res) => {
    const { doctor, date } = req.body;
    try {
        const newAppointment = new Appointment({
            user: req.user.id,
            doctor,
            date
        });
        await newAppointment.save();
        res.json(newAppointment);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
});

// Reschedule an appointment
router.put('/reschedule/:id', auth, async (req, res) => {
    const { date } = req.body;
    try {
        const appointment = await Appointment.findById(req.params.id);
        if (!appointment) return res.status(404).json({ msg: 'Appointment not found' });

        appointment.date = date;
        await appointment.save();
        res.json(appointment);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
});

// Cancel an appointment
router.delete('/cancel/:id', auth, async (req, res) => {
    try {
        const appointment = await Appointment.findById(req.params.id);
        if (!appointment) return res.status(404).json({ msg: 'Appointment not found' });

        await appointment.remove();
        res.json({ msg: 'Appointment canceled' });
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
});

module.exports = router;

