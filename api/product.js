const path = require('path');
const Product = require('../models/Product');

const productAPI={
	create: (req, res, next) => {
		const b = req.body;
		if(!b.title) return next(new Error("Product title is required"));
		if(!b.buy_back_price) return next(new Error("Product buy back price is required"));

		var product= new Product;
		product.title = b.title;
		product.description = b.description;
		product.buy_back_price = b.buy_back_price;
		product.picture = b.picture;

		product.save(function(err, result){
			if(err) return next(err);
			res.json({
				result:'success',
				data: result
			});
		});
	},
	get: (req, res, next) => {
		console.log(req)
		if(!req.query.id) return next(new Error("Product ID is required"));

		Product.findById(req.query.id).exec((err, product)=>{
			if(err) return next(err);
			if (!product) return next(new Error("Product is not found"))
			if(product && product._id){
				res.json(product);
			} else {
				res.json({});
			}
		});
	}
}

module.exports = productAPI;