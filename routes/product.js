var express = require("express");
var router = express.Router();


var Product = require('../models/product/Product');

// All links
router.get('/', (req, res) => {
    res.render('product/list');
});


// Add
router.get('/add_product', (req, res) => {
    res.render('product/item/add');
});

router.post('/add_product', (req, res) => {
    var product = new Product(req.body);
    product.save()
    .then(item => {
      res.redirect('/product/all_product');
    })
    .catch(err => {
      res.status(500).render('404', { err });
    });
});


// List
router.get('/all_product', (req, res) => {
  try {
    Product.find({}).exec((err, products) => {
      if (err) {
        res.status(500).render('404', { err });
      } else {
        res.render('product/item/all', { products });
      }
    })
  } catch (err) {
    res.status(500).render('404', { err });
  }
});


// Edit
router.get('/item/:id/edit', (req, res) => {
  try {
    Product.findOne({ _id: req.params.id }).exec((err, product) => {
      if (err) {
        res.status(500).render('404', { err });
      } else {
        res.render('product/item/edit', { product });
      }
    })
  } catch (err) {
    res.status(500).render('404', { err });
  }
});

router.post('/item/:id/edit', (req, res) => {
  
})

module.exports = router