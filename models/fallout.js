var mongoose = require('mongoose');
var mongoosePaginate = require('mongoose-paginate');

var Schema = mongoose.Schema;

var schema = new Schema({
    id: {type: String},
    source: {type: String},
    source_fallou_id: {type: String},
    error_code: {type: String},
    creation_timestamp: {type: String},
    due_date: {type: String},
    status: {type: String}
});

schema.plugin(mongoosePaginate);

module.exports = mongoose.model('Fallout', schema);