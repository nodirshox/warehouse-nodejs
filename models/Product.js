var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var productSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        default: ''
    },
    buy_back_price: {
        type: Number,
        required: true
    },
    picture: {
        type: String,
        default: ""
    },
    created_at: {
        type: Date,
        default: Date.now
    },
    updated_at: {
        type: Date
    }

});

module.exports = mongoose.model('Product', productSchema);