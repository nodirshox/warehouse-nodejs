var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Types = mongoose.Schema.Types;

var MinipackSchema = new Schema({
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
    minipack: [ MinipackSchema ]
});

module.export = mongoose.model('Package', packageSchema);