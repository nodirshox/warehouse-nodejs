const path = require('path');
const Package = require('../models/Package');
const logger = require("../config/logger");

const packageAPI = {
	create: (req, res, next) => {
		const b = req.body;

		if(!b.title) return next(new Error("Package title is required"));

		var package = new Package;
		package.title = b.title;
        package.product_prices = b.product_prices ? b.product_prices : [];
        package.bundles = [];
		package.created_at = new Date();
		package.updated_at = new Date();

		package.save((err, result) => {
			if(err) return next(err);
			
			logger.debug("Package with ID " + result._id + " is created", { result: result, label: "package" });
			
			return res.json({ 
				result: 'success',
				data: { package_id: result._id }
			});
		});
	},
	find: (req, res, next) => {
		Package.find({}).
        populate("product_prices.product").
		exec((err, result) => {
			if(err) return next(err);
			return res.json({ packages: result });
		});
	},
	get: (req, res, next) => {
		const id = req.params.id;
		if(!id) return next(new Error("Package ID is required"));

		Package.findById(id).
		populate("product_prices.product").
		exec((err, result) => {
			if(err) return next(err);
			if (!result) return next(new Error("Package with ID " + id + " is not found"));

			logger.debug("Package get response", { result: result, label: "package" });

			return res.json({ 
				result: "success",
				data: result 
			});
		});
	},
	update: (req, res, next) => {
		const b = req.body;
		const id = req.params.id;

		if(!id) return next(new Error("Package ID is required"));
		if(!b.title) return next(new Error("Package title is required"));

		Package.findById(id, (err, package) => {
			if(err) return next(err);
			if (!package) return next(new Error("Package with ID " + id + " is not found"));

			package.title = b.title;
			package.product_prices = b.product_prices ? b.product_prices : package.product_prices;
			package.updated_at = new Date();

			package.save((err, result) => {
				if(err) return next(err);

				logger.debug("Package update response", { result: result, label: "package" });

				return res.json({ 
					result: 'success',
					data: { package_id: result._id }
				});
			});
		});
	},
	delete: (req, res, next) => {
		const id = req.params.id;
		if(!id) return next(new Error("Package ID is required"));

		Package.findByIdAndRemove(id, (err, result) => {
			if(err) return next(err);
			if (!result) return next(new Error("Package with ID " + id + " is not found"));

			logger.debug("Package delete response", { result: result, label: "package" });

			return res.json({
				result: 'success',
				data: {}
			});
		});
	}
}

module.exports = packageAPI;