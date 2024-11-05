const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        default: 'patient'
    },
    profile: {
        doctor: {
            type: String
        },
        psychologist: {
            type: String
        },
        weight: {
            type: String
        },
        progressGraphData: {
            labels: [String],
            data: [Number]
        },
        medicines: [],
        recommendedMedicines: [],
        appointments: []
    }
});

module.exports = mongoose.model('User', UserSchema);



