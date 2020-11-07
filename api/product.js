const path = require('path');
const Product = require('../models/Product');
const logger = require("../config/logger");

const productAPI = {
	create: (req, res, next) => {
		logger.debug("Product create request", {
			body: req.body,
			label: "product"
		});

		const b = req.body;

		if(!b.title) return next(new Error("Product title is required"));
		if(b.repurchase_price <= 0) return next(new Error("Product repurchase price is must be positive"));
		if(!b.repurchase_price) return next(new Error("Product repurchase price is required"));

		var product = new Product;
		product.title = b.title;
		product.description = b.description ? b.description : "";
		product.repurchase_price = b.repurchase_price;
		product.picture = b.picture ? b.picture : "";
		product.created_at = new Date();
		product.updated_at = new Date();

		product.save((err, result) => {
			if(err) return next(err);
			
			logger.debug("Product with ID " + result._id + " is created", {
				result: result,
				label: "product"
			});
			
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
		logger.debug("Product get request", {
			params: req.params,
			label: "product"
		});

		const id = req.params.id;
		if(!id) return next(new Error("Product ID is required"));

		Product.findById(id).exec((err, result) => {
			if(err) return next(err);
			if (!result) return next(new Error("Product with ID " + id + " is not found"));
			
			logger.debug("Product get response", {
				result: result,
				label: "product"
			});
			
			return res.json({ 
				result: "success",
				data: result 
			});
		});
	},
	update: (req, res, next) => {
		logger.debug("Product update request", {
			params: req.params,
			body: req.body,
			label: "product"
		});
		
		const b = req.body;
		const id = req.params.id;

		if(!id) return next(new Error("Product ID is required"));
		if(!b.title) return next(new Error("Product title is required"));
		if(b.repurchase_price <= 0) return next(new Error("Product repurchase price is must be positive"));
		if(!b.repurchase_price) return next(new Error("Product repurchase price is required"));

		Product.findById(id, (err, product) => {
			if(err) return next(err);
			if (!product) return next(new Error("Product with ID " + id + " is not found"));

			product.title = b.title;
			product.description = b.description ? b.description : product.description;
			product.repurchase_price = b.repurchase_price;
			product.picture = b.picture ? b.picture : product.picture;
			product.updated_at = new Date();

			product.save((err, result) => {
				if(err) return next(err);
				
				logger.debug("Product update response", {
					result: result,
					label: "product"
				});

				return res.json({
					result: 'success',
					data: { product_id: result._id }
				});
			});
		});
	},
	delete: (req, res, next) => {
		logger.debug("Product delete request", {
			params: req.params,
			label: "product"
		});
		
		const id = req.params.id;
		if(!id) return next(new Error("Product ID is required"));

		Product.findByIdAndRemove(id, (err, result) => {
			if(err) return next(err);
			if (!result) return next(new Error("Product with ID " + id + " is not found"));
			
			logger.debug("Product delete response", {
				result: result,
				label: "product"
			});

			return res.json({
				result: 'success',
				data: {}
			});
		});
	}
}

module.exports = productAPI;