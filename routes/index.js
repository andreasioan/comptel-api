var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
  console.log('you are a twat');
});

router.get('/home', function (req, res, next) {
  res.redirect('/home/index.html');
})

module.exports = router;
