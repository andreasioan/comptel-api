var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
var mongoosePaginate = require('mongoose-paginate');

var Schema = mongoose.Schema;

var schema = new Schema({
    id: {type: String},
    source_fallout_id: {type: String},
    action_id: {type: String},
    target_system: {type: String},
    creation_date: {type: String},
    due_date: {type: String},
    status: {type: String},
    retry_count: {type: String},
    rror_code: {type: String},
    error_desc: {type: String}
});

schema.plugin(mongoosePaginate);

module.exports = mongoose.model('Resolution', schema);