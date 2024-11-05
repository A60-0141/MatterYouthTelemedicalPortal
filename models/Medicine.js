const mongoose = require('mongoose');

const MedicineSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    name: { type: String, required: true },
    dosage: { type: String, required: true },
    prescribedBy: { type: String, required: true }
});

module.exports = mongoose.model('Medicine', MedicineSchema);
