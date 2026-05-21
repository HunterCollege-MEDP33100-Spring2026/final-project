const mongoose = require("mongoose");

const EntrySchema = new mongoose.Schema({

    message: {
        type: String,
        required: true
    },

    emotion: {
        type: String,
        required: true
    },

    category: {
        type: String,
        required: true
    },

    alias: {
        type: String
    },

    recipient: {
        type: String
    },

    sendStatus: {
        type: Boolean,
        default: false
    },

    createdAt: {
        type: Date,
        default: Date.now
    }

});

module.exports = mongoose.model("Entry", EntrySchema);