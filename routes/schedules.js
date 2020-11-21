var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/agenda', function(req, res, next) {
  res.send('theis is the agenda');
});

module.exports = router;
