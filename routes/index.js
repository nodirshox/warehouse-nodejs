var express = require("express");
var router = express.Router();


router.use('/', require('./store'));
router.use('/product', require('./product'));


module.exports = router