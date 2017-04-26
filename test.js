var Fallout = require('./models/fallout');

var mongoose = require('mongoose');

mongoose.connect('public:swinburne@ds117899.mlab.com:17899/comptel-afom');


var fallouts = Fallout.find(function (err, result) {
    for (var i = 0; i < result.length; i++) {
        result[i].creation_timestamp = new Date(result[i].creation_timestamp);
        result[i].save();
        console.log('Done: ' + i);
    }
});