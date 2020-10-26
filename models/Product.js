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
    }

});

module.exports = mongoose.model('Product', productSchema);