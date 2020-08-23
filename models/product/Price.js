var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var priceSchema = new Schema({
    product_price: {
        type: Number,
        required: true
    },
    product: {
        type: types.ObjectId,
        ref: 'Product'
    },
    package: {
        type: types.ObjectId,
        ref: 'Package'
    }

});

module.export = mongoose.model('Price', priceSchema);