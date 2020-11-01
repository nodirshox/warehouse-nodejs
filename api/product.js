const path = require('path');
const Product = require('../models/Product');

const productAPI = {
	create: (req, res, next) => {
		const b = req.body;
		if(!b.title) return next(new Error("Product title is required"));
		if(!b.buy_back_price) return next(new Error("Product buy back price is required"));

		var product = new Product;
		product.title = b.title;
		product.description = b.description;
		product.buy_back_price = b.buy_back_price;
		product.picture = b.picture;
		product.created_at = new Date();
		product.updated_at = new Date();

		product.save((err, result) => {
			if(err) return next(err);
			return res.json({ 
				result: 'success',
				data: { product_id: result._id }
			});
		});
	},
	find: (req, res, next) => {
		Product.find({}).
		exec((err, result) => {
			if(err) return next(err);
			return res.json({ products: result });
		});
	},
	get: (req, res, next) => {
		const id = req.params.id;
		if(!id) return next(new Error("Product ID is required"));

		Product.findById(id).exec((err, result) => {
			if(err) return next(err);
			if (!result) return next(new Error("Product with ID '" + id + "' is not found"));
			return res.json({ 
				result: "success",
				data: result 
			});
		});
	},
	update: (req, res, next) => {
		const b = req.body;
		const id = req.params.id;

		if(!id) return next(new Error("Product ID is required"));
		if(!b.title) return next(new Error("Product title is required"));
		if(!b.buy_back_price) return next(new Error("Product buy back price is required"));

		Product.findById(id, (err, product) => {
			if(err) return next(err);
			if (!product) return next(new Error("Product with ID '" + id + "' is not found"));

			product.title = b.title;
			product.description = b.description ? b.description : product.description;
			product.buy_back_price = b.buy_back_price;
			product.picture = b.picture ? b.picture : product.picture;
			product.updated_at = new Date();

			product.save((err, result) => {
				if(err) return next(err);
				return res.json({ 
					result: 'success',
					data: { product_id: result._id }
				});
			});
		});
	},
	delete: (req, res, next) => {
		const id = req.params.id;
		if(!id) return next(new Error("Product ID is required"));

		Product.findByIdAndRemove(id, (err, result) => {
			if(err) return next(err);
			if (!result) return next(new Error("Product with ID '" + id + "' is not found"));

			return res.json({
				result: 'success',
				data: {} 
			});
		});
	}
}

module.exports = productAPI;