var express = require("express");
var router = express.Router();
var product_controller = require('../controllers/productController');

// Procut
router.get('/', product_controller.find);
router.get('/create', product_controller.create_get);
router.post('/create', product_controller.create_post);
router.get('/edit/:id', product_controller.edit_get);
router.post('/edit/:id', product_controller.edit_post);
router.get('/delete/:id', product_controller.delete_get);
router.post('/delete/:id', product_controller.delete_post);

module.exports = router;