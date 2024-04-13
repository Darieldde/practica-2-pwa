var express = require('express');
var router = express.Router();

var fs = require('fs');

var Cart = require('../models/cart');

// Ruta para mostrar el formulario de inicio de sesión
router.get('/', function(req, res, next) {
  res.render('login', { title: 'Iniciar Sesión' });
});

// Ruta para manejar el inicio de sesión
router.post('/', function(req, res, next) {
  // Agrega aquí la lógica de autenticación básica
  // Por ahora, simplemente redireccionamos al usuario a la página principal
  res.redirect('/');
});

// Ruta principal, muestra los productos

var products = JSON.parse(fs.readFileSync('./data/products.json', 'utf8'));



router.get('/add/:id', function(req, res, next) {

  var productId = req.params.id;
  var cart = new Cart(req.session.cart ? req.session.cart : {});
  var product = products.filter(function(item) {
    return item.id == productId;
  });
  cart.add(product[0], productId);
  req.session.cart = cart;
  res.redirect('/productos');
  inline();
});

router.get('/cart', function(req, res, next) {
  if (!req.session.cart) {
    return res.render('cart', {
      products: null
    });
  }
  var cart = new Cart(req.session.cart);
  res.render('cart', {
    title: 'Carrito de compras',
    products: cart.getItems(),
    totalPrice: cart.totalPrice
  });
});

router.post('/productos', function (req, res, next) {
  var productId = products && products[0].id;

  res.render('index', 
  { 
    title: 'Carrito de compras',
    products: products
  }
  );
});

router.get('/productos', function (req, res, next) {
  var productId = products && products[0].id;

  res.render('index', 
  { 
    title: 'Carrito de compras',
    products: products
  }
  );
});

router.get('/remove/:id', function(req, res, next) {
  var productId = req.params.id;
  var cart = new Cart(req.session.cart ? req.session.cart : {});
  cart.remove(productId);
  req.session.cart = cart;
  res.redirect('/cart');
});

module.exports = router;
