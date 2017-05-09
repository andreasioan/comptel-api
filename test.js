var Fallout = require('./models/fallout');
var Resolution = require('./models/resolution');
var moment = require('moment');

var mongoose = require('mongoose');

mongoose.connect('comptel:swinburne@ds117899.mlab.com:17899/comptel-afom');

// Update dates to ISO format
// var done = 0
// var resolutions = Resolution.find(function (err, result) {
//     for (var i = 0; i < result.length; i++) {

//         console.log(result[i].creation_date = new Date(result[i].creation_date).toISOString());
//         console.log(result[i].due_date = new Date(result[i].due_date).toISOString());
//         result[i].save(function (err, save) {
//             done++;
//             if (err) {
//                 console.log(err);
//             } else {
//                 console.log(save);
//             }
//             console.log('Done: ' + done);
//             if (done === result.length) {
//                 exit();
//             }
//         });

//     }
// });

var done = 0;
var errors = ['null'];

var fallouts = Fallout.find(function (err, result) {
    for (var i = 0; i < result.length; i++) {
        done++;
        if (errors.indexOf(result[i].source_error_code) == -1) {
            errors.push(result[i].source_error_code);
        }
        if (done === result.length) {
            errors.sort(function (a, b) {
                if (a < b) {
                    return -1;
                }
                if (a > b) {
                    return 1;
                }

                return 0;
            });
            for (var k = 0; k < errors.length; k++) {
                console.log(errors[k]);
            }
            exit();
        }
    }
});

function exit() {
    console.log('Complete.');
    mongoose.disconnect();
}

