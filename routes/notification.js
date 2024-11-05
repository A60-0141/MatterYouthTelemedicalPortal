const express = require('express');
const router = express.Router();
const { notify } = require('../services/notificationService');

// Trigger notification (e.g., appointment reminder)
router.post('/trigger', (req, res) => {
    const { userId, message } = req.body;
    try {
        notify(userId, message);
        res.status(200).send('Notification triggered');
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
});

module.exports = router;



