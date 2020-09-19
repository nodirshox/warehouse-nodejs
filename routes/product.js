var express = require("express");
var router = express.Router();
var product_controller = require('../controllers/productController');

// Product
router.get('/', product_controller.find);
router.get('/create', product_controller.create_get);
router.post('/create', product_controller.create_post);
router.get('/update/:id', product_controller.update_get);
router.post('/update/:id', product_controller.update_post);
router.get('/delete/:id', product_controller.delete_get);
router.post('/delete/:id', product_controller.delete_post);

module.exports = router;