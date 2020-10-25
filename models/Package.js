var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Types = mongoose.Schema.Types;

var Mini_packSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    product_quantity: [{
        product: {
            type: Types.ObjectId,
            ref: 'Product'
        },
        quantity: {
            type: Number,
            required: true
        }
    }]

});

var packageSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    product_price: [{
        product: {
            type: Types.ObjectId,
            ref: 'Product'
        },
        price: {
            type: Number,
            required: true
        }
    }],
    mini_pack: [ Mini_packSchema ]
});

module.exports = mongoose.model('Package', packageSchema);