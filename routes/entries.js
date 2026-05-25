const express = require('express');
const router = express.Router();
const Entry = require('../models/Entry');


// GET ALL MEMORIES

router.get('/', async function(req, res) {

    const entries =
    await Entry.find().sort({
        createdAt: -1
    });

    res.json(entries);

});


// ADD MEMORY

router.post('/', async function(req, res) {

    const newEntry =
    new Entry({

        memory: req.body.memory,
        color: req.body.color

    });

    await newEntry.save();

    res.json({
        success: true
    });

});

module.exports = router;
