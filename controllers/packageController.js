var Package = require('../models/product/Package');
var Product = require('../models/product/Product');

// create 
exports.create_get = (req, res) => {
    try {
        Product.find({}).exec((err, products) => {
			if (err) {
				res.status(500).render('404', { err });
			} else {
				res.render('package/create', { products });
			}
        })
    } catch (err) {
        res.status(500).render('404', { err });
    }
};

exports.create_post = (req, res) => {
	console.log(req.body)
};