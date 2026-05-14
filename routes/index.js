var express = require('express');
var router = express.Router();
const Entry = require('../models/notes');

/* GET home page. */ // actual home page
router.get('/', async function (req, res) {
  const notes = await Entry.find().sort({
    createdAt: -1
  });
  res.render('index', {
    title: 'Therapy Wallpaper', notes: notes
  })
});

module.exports = router;



