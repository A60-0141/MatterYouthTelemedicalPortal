const express = require('express');
const router = express.Router();
const Medicine = require('../models/Medicine');

router.get('/:userId', async (req, res) => {
    try {
        const medicines = await Medicine.find({ userId: req.params.userId });
        res.json(medicines);
    } catch (err) {
        res.status(500).send('Server error');
    }
});

router.post('/', async (req, res) => {
    const { userId, name, dosage, prescribedBy } = req.body;
    try {
        const medicine = new Medicine({ userId, name, dosage, prescribedBy });
        await medicine.save();
        res.json(medicine);
    } catch (err) {
        res.status(500).send('Server error');
    }
});

module.exports = router;
