const mongoose = require('mongoose');

const entrySchema = new mongoose.Schema({
    message: {
        type: String,
        required: true
    },
    mood: {
        type: String,
        default: 'unknown'
    },
    toWhom: {
        type: String,
        default: 'to a stranger'
    },
    tag: {
        type: String,
        default: ''
    }
}, { timestamps: true });

module.exports = mongoose.model('Entry', entrySchema);