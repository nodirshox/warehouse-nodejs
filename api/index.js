var express=require('express');
var router=express.Router();

var productAPI = require('./product.js');

/****  PRODUCT API ****/
router.post('/product/create', productAPI.create);

router.use(function(req, res){
	res.json({message:'you are requesting my api server'});
});

module.exports=router;