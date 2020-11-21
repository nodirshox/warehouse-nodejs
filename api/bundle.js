const path = require("path");
const Package = require("../models/Package");
const logger = require("../config/logger");

const bundleAPI = {
	create: (req, res, next) => {
		let package_id = req.params.package_id;
		let bundle = req.body;

		if(!package_id) return next(new Error("Package ID is required"));
		if(!bundle.title) return next(new Error("Bundle title is required"));
		
        Package.findById(package_id, (err, result) => {
            if(err) return next(err);
			if(!result) return next(new Error("Package with ID " + package_id + " not found"));
			
            bundle.created_at = Date.now();
            bundle.updated_at = Date.now();
            let b = result.bundles.push(bundle);
            let newBundle = result.bundles[b - 1];

            result.save((err, result) => {
                if(err) return next(err);
                logger.debug("Bundle with ID " + result._id + " is created", { result: result, label: "bundle" });
                
                return res.json({
                    result: 'success',
                    data: { 
						package_id: package_id,
						bundle_id: newBundle._id
					}
                });
            });
        });
	},
	find: (req, res, next) => {
		let package_id = req.params.package_id;
		if(!package_id) return next(new Error("Package ID is required"));

		Package.findById(package_id).
		populate("bundles.product_quantity.product").
		exec((err, result) => {
			if(err) return next(err);
			if(!result) return next(new Error("Package ID with " + package_id + " not found"));
			return res.json({ package_id: package_id, bundles: result.bundles });
		});
	},
	get: (req, res, next) => {
		let package_id = req.params.package_id;
		let bundle_id = req.params.id;

		if(!package_id) return next(new Error("Package ID is required"));
		if(!bundle_id) return next(new Error("Bundle ID is required"));

		Package.findById(package_id).
		populate("bundles.product_quantity.product").
		exec((err, result) => {
			if(err) return next(err);
			if (!result) return next(new Error("Package with ID " + package_id + " is not found"));
			
			let bundle;
			let is_found = false;
			for (var i in result.bundles) {
				if (result.bundles[i]._id == bundle_id) {
					bundle = result.bundles[i];
					is_found = true;
				}
			}
			if(!is_found) bundle = null;

			return res.json({ 
				result: "success",
				data: {
					package_id: package_id,
					bundle: bundle
				} 
			});
		});
	},
	update: (req, res, next) => {
		let package_id = req.params.package_id;
		let bundle_id = req.params.id;
		let newBundle = req.body;

		if(!package_id) return next(new Error("Package ID is required"));
		if(!bundle_id) return next(new Error("Bundle ID is required"));
		if(!newBundle.title) return next(new Error("Bundle title is required"));

		Package.findById(package_id, (err, package) => {
			if(err) return next(err);
			if (!package) return next(new Error("Package with ID " + package_id + " is not found"));

			package.bundles = package.bundles.map((bundle, i) => {
				if(bundle._id == bundle_id){
					bundle.title = newBundle.title;
					bundle.product_quantity = newBundle.product_quantity;
					bundle.updated_at = Date.now();
					return bundle;
				}
				return bundle;
			});

			package.save((err, result) => {
				if(err) return next(err);
				logger.debug("Bundle update response", { result: result, label: "bundle" });

				return res.json({ 
					result: 'success',
					data: { package_id: package_id, bundle_id: bundle_id }
				});
			});
		});
	},
	delete: (req, res, next) => {
		logger.debug("Package delete request", {
			params: req.params,
			label: "package"
		});

		const id = req.params.id;
		if(!id) return next(new Error("Package ID is required"));

		Package.findByIdAndRemove(id, (err, result) => {
			if(err) return next(err);
			if (!result) return next(new Error("Package with ID " + id + " is not found"));

			logger.debug("Package delete response", {
				result: result,
				label: "package"
			});

			return res.json({
				result: 'success',
				data: {}
			});
		});
	}
}

module.exports = bundleAPI;