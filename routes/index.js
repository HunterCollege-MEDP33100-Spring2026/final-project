var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', {
    title: 'Messages in a Bottle',
    subtitle: 'Leave an anonymous message behind for someone else to discover.',
    introText: 'This public archive collects messages, confessions, hopes, and thoughts from strangers. Drop your message into the sea and explore what others left behind.'
  });
});

module.exports = router;