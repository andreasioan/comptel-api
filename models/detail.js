var mongoose = require('mongoose');
mongoose.Promise = global.Promise;

var Schema = mongoose.Schema;

var schema = new Schema({
    id: {type: String},
    fallout_id: {type: String},
    property_name: {type: String},
    property_value: {type: String}
});

module.exports = mongoose.model('Detail', schema);