var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

router.get('/home', function (req, res, next) {
  res.redirect('/home/index.html');
})

router.use('/api', require('./api'));

module.exports = router;
