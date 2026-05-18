var express = require('express');
var router = express.Router();
const fs = require('fs');
const Entry = require('../models/notes');

router.get('/', async function (req, res) {
  const notes = await Entry.find().sort({
    createdAt: -1
  });
  res.render('index', {
    title: 'Therapy Wallpaper', notes: notes
  })
});

module.exports = router;



