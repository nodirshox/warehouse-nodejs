var express = require('express');
var router = express.Router();

var productAPI = require('./product.js');
var packageAPI = require('./package.js');
var bundleAPI = require('./bundle.js')

// Product API
router.post('/product', productAPI.create);
router.get('/product', productAPI.find);
router.get('/product/:id', productAPI.get);
router.put('/product/:id', productAPI.update);
router.delete('/product/:id', productAPI.delete)

// Package API
router.post('/package', packageAPI.create);
router.get('/package', packageAPI.find);
router.get('/package/:id', packageAPI.get);
router.put('/package/:id', packageAPI.update);
router.delete('/package/:id', packageAPI.delete);

// Bundle API
router.post('/package/:package_id/bundle', bundleAPI.create);
router.get('/package/:package_id/bundle', bundleAPI.find);
router.get('/package/:package_id/bundle/:id', bundleAPI.get);
router.put('/package/:package_id/bundle/:id', bundleAPI.update);

router.use((req, res) => {
	res.json({ message: 'Hey brother, it is API Gateway!' });
});

module.exports = router;