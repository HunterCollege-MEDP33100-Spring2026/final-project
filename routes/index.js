var express = require('express');
var router = express.Router();
var Entry = require('../models/Entry');
 
router.get('/', function(req, res, next) {
  var category = req.query.category;
  var filter = category && category !== 'all' ? { category: category } : {};
 
  Entry.find(filter).sort({ createdAt: -1 })
    .then(function(entries) {
      res.render('index', {
        title: 'I Love NYC',
        entries: entries,
        entriesJson: JSON.stringify(entries),
        selectedCategory: category || 'all'
      });
    })
    .catch(function(err) {
      next(err);
    });
});
 
module.exports = router;
 