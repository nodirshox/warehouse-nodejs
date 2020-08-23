var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var packSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    package: {
        type: Types.ObjectId,
        ref: 'Package'
    }

});

module.export = mongoose.model('Pack', packSchema);