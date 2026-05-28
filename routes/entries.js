var express = require('express');
var router = express.Router();
var Entry = require('../models/Entry');
 
router.get('/', function(req, res, next) {
  var category = req.query.category;
  var filter = category && category !== 'all' ? { category: category } : {};
 
  Entry.find(filter).sort({ createdAt: -1 })
    .then(function(entries) {
      res.json(entries);
    })
    .catch(function(err) {
      res.status(500).json({ error: 'Server error' });
    });
});
 
router.post('/', function(req, res, next) {
  var name = req.body.name;
  var location = req.body.location;
  var review = req.body.review;
  var category = req.body.category;
  var submittedBy = req.body.submittedBy;
  var lat = req.body.lat;
  var lng = req.body.lng;
 
  if (!name || !location || !review || !category) {
    return res.status(400).json({ error: 'Name, location, review, and category are required' });
  }
 
  var newEntry = new Entry({
    name: name,
    location: location,
    review: review,
    category: category,
    submittedBy: submittedBy || 'anonymous',
    lat: lat ? parseFloat(lat) : null,
    lng: lng ? parseFloat(lng) : null
  });
 
  newEntry.save()
    .then(function(entry) {
      res.status(201).json(entry);
    })
    .catch(function(err) {
      res.status(500).json({ error: 'Server error' });
    });
});
 
router.get('/:id', function(req, res, next) {
  var id = req.params.id;
 
  Entry.findById(id)
    .then(function(entry) {
      if (!entry) return res.status(404).json({ error: 'Entry not found' });
      res.json(entry);
    })
    .catch(function(err) {
      res.status(500).json({ error: 'Server error' });
    });
});
 
router.put('/:id', function(req, res, next) {
  var id = req.params.id;
  var name = req.body.name;
  var location = req.body.location;
  var review = req.body.review;
  var category = req.body.category;
  var lat = req.body.lat;
  var lng = req.body.lng;
 
  Entry.findByIdAndUpdate(
    id,
    { name: name, location: location, review: review, category: category, lat: lat, lng: lng },
    { new: true }
  )
    .then(function(entry) {
      if (!entry) return res.status(404).json({ error: 'Entry not found' });
      res.json(entry);
    })
    .catch(function(err) {
      res.status(500).json({ error: 'Server error' });
    });
});
 
router.delete('/:id', function(req, res, next) {
  var id = req.params.id;
 
  Entry.findByIdAndDelete(id)
    .then(function(entry) {
      if (!entry) return res.status(404).json({ error: 'Entry not found' });
      res.json({ message: 'Entry deleted' });
    })
    .catch(function(err) {
      res.status(500).json({ error: 'Server error' });
    });
});
 
module.exports = router;