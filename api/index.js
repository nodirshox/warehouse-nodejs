var express=require('express');
var router=express.Router();

var productAPI = require('./product.js');

/****  PRODUCT API ****/
router.post('/product', productAPI.create);
router.get('/product', productAPI.find);
router.get('/product/:id', productAPI.get);
router.put('/product/:id', productAPI.update);
router.delete('/product/:id', productAPI.delete)

router.use((req, res) => {
	res.json({message:'you are requesting my api server'});
});

module.exports=router;