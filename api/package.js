const path = require('path');
const Package = require('../models/Package');

const packageAPI = {
	create: (req, res, next) => {
        const b = req.body;
		if(!b.title) return next(new Error("Package title is required"));

		var package = new Package;
		package.title = b.title;
        package.product_prices = b.product_prices ? b.product_prices : [];
        package.mini_packs = [];
		package.created_at = new Date();
		package.updated_at = new Date();

		package.save((err, result) => {
			if(err) return next(err);
			return res.json({ 
				result: 'success',
				data: { package_id: result._id }
			});
		});
	},
	find: (req, res, next) => {
        Package.find({}).
        populate(["product"]).
		exec((err, result) => {
			if(err) return next(err);
			return res.json({ packages: result });
		});
	},
	get: (req, res, next) => {
		const id = req.params.id;
		if(!id) return next(new Error("Package ID is required"));

		Package.findById(id).exec((err, result) => {
			if(err) return next(err);
			if (!result) return next(new Error("Package with ID '" + id + "' is not found"));
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
		if(b.repurchase_price <= 0) return next(new Error("Package repurchase price is must be positive"));
		if(!b.repurchase_price) return next(new Error("Package repurchase price is required"));

		Package.findById(id, (err, package) => {
			if(err) return next(err);
			if (!package) return next(new Error("Package with ID '" + id + "' is not found"));

			package.title = b.title;
			package.description = b.description ? b.description : package.description;
			package.repurchase_price = b.repurchase_price;
			package.picture = b.picture ? b.picture : package.picture;
			package.updated_at = new Date();

			package.save((err, result) => {
				if(err) return next(err);
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
			if (!result) return next(new Error("Package with ID '" + id + "' is not found"));

			return res.json({
				result: 'success',
				data: {}
			});
		});
	}
}

module.exports = packageAPI;