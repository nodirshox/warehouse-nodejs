var Product = require("../models/product/Product");

// find
exports.find = (req, res) => {
    try {
        Product.find({}).exec((err, products) => {
			if (err) {
				res.status(500).render('404', { err });
			} else {
				res.render('product/find', { products });
			}
        })
    } catch (err) {
        res.status(500).render('404', { err });
    }
};

// create 
exports.create_get = (req, res) => {
	res.render('product/create');
}

exports.create_post = (req, res) => {
	var product = new Product(req.body);
    product.save().then(item => {
    	res.redirect('/product/');
    })
    .catch(err => {
    	res.status(500).render('404', { err });
    });
}

// Edit
exports.edit_get = (req, res) => {
	try {
		Product.findOne({ _id: req.params.id }).exec((err, product) => {
			if (err) {
				res.status(500).render('404', { err });
			} else {
				res.render('product/edit', { product });
			}
		})
	} catch (err) {
		res.status(500).render('404', { err });
	}
}
exports.edit_post = (req, res) => {
    try {
		Product.findOneAndUpdate({ _id: req.params.id }, { $set: req.body }, function (err, result) {
			res.redirect('/product')
		})
	} catch (err) {
		res.status(500).render('404', { err });
	}
}

// Delete
exports.delete_get = (req, res) => {
	try {
		Product.findOne({ _id: req.params.id }).exec((err, product) => {
			if (err) {
				res.status(500).render('404', { err });
			} else {
				res.render('product/delete', { product });
			}
		})
	} catch (err) {
		res.status(500).render('404', { err });
	}
}
exports.delete_post = (req, res) => {
	try {
		Product.findOneAndDelete({ _id: req.params.id }, (err, result) => {
			res.redirect('/product')
		})
	} catch (err) {
		res.status(500).render('404', { err });
	}
}