var mongoose = require('mongoose');
var mongoosePaginate = require('mongoose-paginate');

var Schema = mongoose.Schema;

var schema = new Schema({
    id: {type: String},
    source_system: {type: String},
    source_fallout_id: {type: String},
    source_error_code: {type: String},
    creation_date: {type: String},
    due_date: {type: String},
    status: {type: String}
});

schema.plugin(mongoosePaginate);

module.exports = mongoose.model('Fallout', schema);