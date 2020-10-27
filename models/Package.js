var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Types = mongoose.Schema.Types;

var miniPackSchema = new Schema({
    title: {
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
    }],
    created_at: {
        type: Date,
        default: Date.now
    },
    updated_at: {
        type: Date
    }
});

var packageSchema = new Schema({
    title: {
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
    mini_pack: [ miniPackSchema ],
    created_at: {
        type: Date,
        default: Date.now
    },
    updated_at: {
        type: Date
    }
});

module.exports = mongoose.model('Package', packageSchema);