var express=require('express');
var router=express.Router();

var productAPI = require('./product.js');
//ar packageAPI = require('./package.js');

/****  PRODUCT API ****/
router.post('/product', productAPI.create);
router.get('/product', productAPI.find);
router.get('/product/:id', productAPI.get);
router.put('/product/:id', productAPI.update);
router.delete('/product/:id', productAPI.delete)

/***  PACKAGE API  ***/
/*
router.post('/package', packageAPI.create);
router.get('/package', packageAPI.find);
router.get('/package/:id', packageAPI.get);
router.put('/package/:id', packageAPI.update);
router.delete('/package/:id', packageAPI.delete)
*/

router.use((req, res) => {
	res.json({message:'you are requesting my api server'});
});

module.exports=router;