var express = require("express");
var router = express.Router();

router.use('/', require('./store'));
router.use('/product', require('./product'));
router.use('/package', require('./package'));

module.exports = router