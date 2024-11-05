const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AppointmentSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    doctor: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    status: {
        type: String,
        default: 'scheduled'
    }
}, { timestamps: true });

module.exports = Appointment = mongoose.model('appointment', AppointmentSchema);
