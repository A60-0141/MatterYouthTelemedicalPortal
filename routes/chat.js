const express = require('express');
const router = express.Router();
const Message = require('../models/Message');


router.get('/', async (req, res) => {
    try {
        const messages = await Message.find().populate('sender');
        res.json(messages);
    } catch (err) {
        res.status(500).send('Server error');
    }
});

router.post('/', async (req, res) => {
    const { sender, content } = req.body;
    try {
        const message = new Message({ sender, content });
        await message.save();
        res.json(message);
    } catch (err) {
        res.status(500).send('Server error');
    }
});

module.exports = router;
