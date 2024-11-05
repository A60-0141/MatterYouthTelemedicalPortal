const mongoose = require('mongoose');

const MessageSchema = new mongoose.Schema({
    sender: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    content: { type: String, required: true },
    createdAt: { type: Date, default: Date.now, expires: '7d' }  // Auto-delete after 7 days
});

module.exports = mongoose.model('Message', MessageSchema);
