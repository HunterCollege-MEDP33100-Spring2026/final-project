var express = require('express');
var router = express.Router();

const Entry = require('../models/Entry');


// GET all entries
router.get('/', async function (req, res) {

    try {

        const entries = await Entry.find().sort({ createdAt: -1 });

        res.json(entries);

    } catch (error) {

        res.status(500).json({
            error: 'Failed to fetch entries.'
        });
    }
});


// CREATE new entry
router.post('/', async function (req, res) {

    try {

        const newEntry = new Entry({
            message: req.body.message,
            emotion: req.body.emotion,
            category: req.body.category,
            alias: req.body.alias,
            recipient: req.body.recipient,
            sendStatus: req.body.sendStatus
        });

        await newEntry.save();

        res.json(newEntry);

    } catch (error) {

        res.status(500).json({
            error: 'Failed to create entry.'
        });
    }
});


// GET single entry
router.get('/:id', async function (req, res) {

    try {

        const entry = await Entry.findById(req.params.id);

        if (!entry) {
            return res.status(404).json({
                error: 'Entry not found.'
            });
        }

        res.json(entry);

    } catch (error) {

        res.status(500).json({
            error: 'Failed to fetch entry.'
        });
    }
});


// UPDATE single entry
router.put('/:id', async function (req, res) {

    try {

        const updatedEntry = await Entry.findByIdAndUpdate(
            req.params.id,
            {
                message: req.body.message,
                emotion: req.body.emotion,
                category: req.body.category,
                alias: req.body.alias,
                recipient: req.body.recipient,
                sendStatus: req.body.sendStatus
            },
            { new: true }
        );

        if (!updatedEntry) {
            return res.status(404).json({
                error: 'Entry not found.'
            });
        }

        res.json(updatedEntry);

    } catch (error) {

        res.status(500).json({
            error: 'Failed to update entry.'
        });
    }
});


// DELETE single entry
router.delete('/:id', async function (req, res) {

    try {

        const deletedEntry = await Entry.findByIdAndDelete(req.params.id);

        if (!deletedEntry) {
            return res.status(404).json({
                error: 'Entry not found.'
            });
        }

        res.json({
            message: 'Entry deleted successfully.'
        });

    } catch (error) {

        res.status(500).json({
            error: 'Failed to delete entry.'
        });
    }
});

module.exports = router;
