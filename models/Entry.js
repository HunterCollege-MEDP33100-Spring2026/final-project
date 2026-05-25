const mongoose = require('mongoose');

const entrySchema = new mongoose.Schema({
    memory: {
        type: String,
        required: true
    },

    color: {
        type: String,
        default: '#ffeb3b'
    },

    createdAt: {
        type: Date,
        default: Date.now
    }
    });

module.exports = mongoose.model('Entry', entrySchema);
