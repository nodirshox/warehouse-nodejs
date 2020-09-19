var express = require("express");
var router = express.Router();
var package_controller = require('../controllers/packageController');

// Package
router.get('/create', package_controller.create_get);
router.post('/create', package_controller.create_post);

module.exports = router;