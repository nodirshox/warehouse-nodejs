var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var quantitySchema = new Schema({
    quantiy: {
        type: Number,
        required: true
    },
    pack: {
        type: types.ObjectId,
        ref: 'Pack'
    },
    product: {
        type: types.ObjectId,
        ref: 'Product'
    }

});

module.export = mongoose.model('Quantity', quantitySchema);