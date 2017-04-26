var Fallout = require('./models/fallout');
var Resolution = require('./models/resolution');
var moment = require('moment');

// var mongoose = require('mongoose');

// mongoose.connect('comptel:swinburne@ds117899.mlab.com:17899/comptel-afom');


// var fallouts = Fallout.find(function (err, result) {
//     for (var i = 0; i < result.length; i++) {

//         console.log(result[i].creation_timestamp = new Date(result[i].creation_timestamp).toISOString());
//         console.log(result[i].due_date = new Date(result[i].due_date).toISOString());
//         result[i].save(function(err, save) {
//             if (err) {
//                 console.log(err);
//             } else {
//                 console.log(save);
//             }

//         });
//         console.log('Done: ' + i);
//     }
// });

// var fallouts = Fallout.find(function (err, result) {
//     for (var i = 0; i < result.length; i++) {
//         let momDate = moment(result[i].creation_timestamp + " +000", "DD-MM-YY HH:mm Z");
//         let momDueDate = moment(result[i].due_date + " +000", "DD-MM-YY HH:mm Z");

//         console.log(result[i].creation_timestamp = new Date(momDate).toISOString());
//         console.log(result[i].due_date = new Date(momDueDate).toISOString());
//         result[i].save(function(err, save) {
//             if (err) {
//                 console.log(err);
//             } else {
//                 console.log(save);
//             }

//         });
//         console.log('Done: ' + i);
//     }
// });

console.log(moment('	2017-03-13T12:10:00.000Z').startOf('day').toISOString());