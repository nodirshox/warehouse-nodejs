var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var packagetSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    }
});

module.export = mongoose.model('Package', packagetSchema);