var mongoose = require('mongoose');
var mongoosePaginate = require('mongoose-paginate');

var Schema = mongoose.Schema;

var schema = new Schema({
    id: {type: String},
    source_fallout_id: {type: String},
    action_id: {type: String},
    target_system: {type: String},
    creation_date: {type: Date},
    due_date: {type: Date},
    status: {type: String},
    retry_count: {type: String}
});

schema.plugin(mongoosePaginate);

module.exports = mongoose.model('Resolution', schema);