module.exports = function (io) {
  var express = require('express');
  var router = express.Router();

  io.on("connection", function (socket) {
    console.log("A user connected");
  });

  /* GET home page. */
  router.get('/', function (req, res, next) {
    res.render('index');
  });

  router.get('/home', function (req, res, next) {
    res.redirect('/home/index.html');
  })

  return router;
}