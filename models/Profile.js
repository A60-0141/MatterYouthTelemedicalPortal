const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProfileSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    doctor: {
        type: String,
        default: 'Unknown'
    },
    psychologist: {
        type: String,
        default: 'Unknown'
    },
    weight: {
        type: Number,
        default: 0
    },
    progressGraphData: {
        labels: {
            type: [String],
            default: []
        },
        data: {
            type: [Number],
            default: []
        }
    },
    medicines: {
        type: [String],
        default: []
    },
    recommendedMedicines: {
        type: [String],
        default: []
    },
    appointments: {
        type: [Date],
        default: []
    }
}, { timestamps: true });

module.exports = Profile = mongoose.model('profile', ProfileSchema);

