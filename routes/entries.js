var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
    // Your code here

    res.send("Returns all entries.");
});

router.post('/', function (req, res, next) {
    // Your code here

    res.send("Created a new entry.");
});

router.get('/:id', function (req, res, next) {
    const id = req.params.id;
    // Your code here

    res.send("Returns entry with id: " +id);
});

router.put('/:id', function (req, res, next) {
    const id = req.params.id;
    // Your code here

    res.send("Updated entry with id: " + id);
});

router.delete('/:id', function (req, res, next) {
    const id = req.params.id;
    // Your code here

    res.send("Deleted entry with id: " + id);
});

module.exports = router;
