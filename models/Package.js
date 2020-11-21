var mongoose = require("mongoose");
var uuid = require("uuid");
var Schema = mongoose.Schema;

var bundleSchema = new Schema({
    _id: { 
		type: String,
		default: function genUUID() {
			return uuid.v4()
		}
	},
    title: {
        type: String,
        required: true
    },
    product_quantity: [{
        product: {
            type: Schema.Types.ObjectId,
            ref: "Product",
            required: true
        },
        quantity: {
            type: Number,
            required: true,
            min: [0, "Product quantity must be positive"],
            validate: {
                validator: Number.isInteger,
                message: '{VALUE} is not an integer value'
            }
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
    _id: { 
		type: String,
		default: function genUUID() {
			return uuid.v4()
		}
	},
    title: {
        type: String,
        required: true
    },
    product_prices: [{
        product: {
            type: Schema.Types.ObjectId,
            ref: "Product",
            required: true
        },
        price: {
            type: Number,
            required: true,
            min: [0, "Product price must be positive"]
        }
    }],
    bundles: [ bundleSchema ],
    created_at: {
        type: Date,
        default: Date.now
    },
    updated_at: {
        type: Date
    }
});

module.exports = mongoose.model("Package", packageSchema);