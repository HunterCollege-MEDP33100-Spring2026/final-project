var express = require('express');
var router = express.Router();
const Entry = require('../models/notes');

router.get('/', async function (req, res, next) {
    try {
        const entries = await Entry.find();
        res.json(entries);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.post('/', async function (req, res, next) {
    const entry = new Entry({
        title: req.body.title,
        content: req.body.content
    });

    try {
        const newEntry = await entry.save();
        res.status(201).json(newEntry);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

router.get('/:id', async function (req, res, next) {
    try {
        const entry = await Entry.findById(req.params.id);
        if (!entry) return res.status(404).json({ message: "Not found" });
        res.json(entry);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.put('/:id', async function (req, res, next) {
    try {
        const updatedEntry = await Entry.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        res.json(updatedEntry);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

router.delete('/:id', async function (req, res, next) {
    try {
        await Entry.findByIdAndDelete(req.params.id);
        res.json({ message: "Deleted entry with id: " + req.params.id });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;



