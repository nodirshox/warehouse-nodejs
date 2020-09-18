var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var productSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String
    },
    buy_back_price: {
        type: Number,
        required: true
    },
    picture: {
        type: String,
        required: true
    }

});

module.exports = mongoose.model('Product', productSchema);