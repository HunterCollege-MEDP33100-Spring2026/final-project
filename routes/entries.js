var express = require('express');
var router = express.Router();
const Entry = require('../models/Entry');

// GET /entries -> get all entries
router.get('/', async function (req, res, next) {
    try {
        const entries = await Entry.find().sort({ createdAt: -1 });
        res.status(200).json(entries);
    } catch (error) {
        console.log('Error getting entries:', error);
        res.status(500).json({ error: 'Failed to get entries.' });
    }
});

// POST /entries -> create a new entry
router.post('/', async function (req, res, next) {
    try {
        const { message, mood, toWhom, tag } = req.body;

        // simple validation
        if (!message || message.trim() === '') {
            return res.status(400).json({ error: 'Message is required.' });
        }

        const newEntry = new Entry({
            message: message.trim(),
            mood,
            toWhom,
            tag
        });

        const savedEntry = await newEntry.save();
        res.status(201).json(savedEntry);
    } catch (error) {
        console.log('Error creating entry:', error);
        res.status(500).json({ error: 'Failed to create entry.' });
    }
});

// GET /entries/:id -> get one entry by id
router.get('/:id', async function (req, res, next) {
    const id = req.params.id;

    try {
        const entry = await Entry.findById(id);

        if (!entry) {
            return res.status(404).json({ error: 'Entry not found.' });
        }

        res.status(200).json(entry);
    } catch (error) {
        console.log('Error getting entry:', error);
        res.status(500).json({ error: 'Failed to get entry.' });
    }
});

// PUT /entries/:id -> update one entry
router.put('/:id', async function (req, res, next) {
    const id = req.params.id;

    try {
        const { message, mood, toWhom, tag } = req.body;

        const updatedEntry = await Entry.findByIdAndUpdate(
            id,
            {
                message,
                mood,
                toWhom,
                tag
            },
            { new: true, runValidators: true }
        );

        if (!updatedEntry) {
            return res.status(404).json({ error: 'Entry not found.' });
        }

        res.status(200).json(updatedEntry);
    } catch (error) {
        console.log('Error updating entry:', error);
        res.status(500).json({ error: 'Failed to update entry.' });
    }
});

// DELETE /entries/:id -> delete one entry
router.delete('/:id', async function (req, res, next) {
    const id = req.params.id;

    try {
        const deletedEntry = await Entry.findByIdAndDelete(id);

        if (!deletedEntry) {
            return res.status(404).json({ error: 'Entry not found.' });
        }

        res.status(200).json({ message: 'Entry deleted successfully.' });
    } catch (error) {
        console.log('Error deleting entry:', error);
        res.status(500).json({ error: 'Failed to delete entry.' });
    }
});

module.exports = router;