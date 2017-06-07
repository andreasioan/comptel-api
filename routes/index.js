var express = require('express');
var router = express.Router();

router.get('/home', function (req, res, next) {
  res.redirect('/home/index.html');
})

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

router.use('/api', require('./api'));

module.exports = router;
