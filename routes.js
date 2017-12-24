var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.render('admin', { title: 'TVR' });
});

router.get('/admin', function(req, res) {
  res.render('admin', {});
});

router.get('/overlays/mtv_melee', function(req, res) {
  res.render('overlays/mtv_melee', {});
});


module.exports = router;
