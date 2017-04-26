var Fallout = require('./models/fallout');
var moment = require('moment');

// var mongoose = require('mongoose');

// mongoose.connect('public:swinburne@ds117899.mlab.com:17899/comptel-afom');


// var fallouts = Fallout.find(function (err, result) {
//     for (var i = 0; i < result.length; i++) {
//         var momDate = moment(result[i].creation_timestamp).format("DD-MM-YY HH:MM");
//         console.log(momDate.toISOString());


//         // result[i].creation_timestamp = new Date(result[i].creation_timestamp);


//         // result[i].save();
//         console.log('Done: ' + i);
//     }
// });

// var momDate = moment("17/03/17 15:27", "DD-MM-YY HH:MM");
var momDate = moment("17/03/17 10:27 +000", "DD-MM-YY HH:mm Z");
date = new Date(momDate);
console.log(date);