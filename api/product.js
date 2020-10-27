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

		product.save(function(err, result){
			if(err) return next(err);
			return res.json({ result:'success', data: { product_id: result._id }});
		});
	},
	find: (req, res, next) => {
		Product.aggregate([
			{ "$project": {
					"_id": 0,
					"id": "$_id",
					"title": "$title",
					"description": "$description",
					"buy_back_price": "$buy_back_price",
					"picture": "$picture"
				}
			}
		]).exec((err, result) => {
			if(err) return next(err);
			if (!result) return next(new Error("Product is not found"))
			return res.json({ products: result });
		});
	},
	get: (req, res, next) => {
		const id = req.params.id;
		if(!id) return next(new Error("Product ID is required"));

		Product.findById(id).exec((err, result) => {
			if(err) return next(err);
			if (!result) return next(new Error("Product with ID '" + id + "' is not found"))
			let product = {
				id: result._id,
				title: result.title,
				description: result.description,
				buy_back_price: result.buy_back_price,
				picture: result.picture
			}
			return res.json({ result: "success", data: product });
		});
	},
	update: (req, res, next) => {
		const b = req.body;
		if(!req.params.id) return next(new Error("Product ID is required"));
		if(!b.title) return next(new Error("Product title is required"));
		if(!b.buy_back_price) return next(new Error("Product buy back price is required"));

		Product.findById(req.params.id, (err, product) => {
			product.title = b.title;
			product.description = b.description;
			product.buy_back_price = b.buy_back_price;
			product.picture = b.picture;			

			product.save((err, result) => {
				if(err) return next(err);
				return res.json({ result:'success', data: { product_id: result._id }});
			});
		});
	},
	delete: (req,res,next) => {
		const id = req.params.id;
		if(!id) return next(new Error("Product ID is required"));
		Product.findByIdAndRemove(id, (err, result)=>{
			if(err) return next(err);
			if (!result) return next(new Error("Product with ID '" + id + "' is not found"));
			res.json({ result: 'success', data: {} });
		});
	}
}

module.exports = productAPI;