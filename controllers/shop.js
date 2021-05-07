const Product = require('../models/product');
const Cart = require('../models/cart')


exports.getProducts = (req, res, next) => {
    Product.fetchAll(products => {
      res.render('shop/products', {
        prods: products,
        pageTitle: 'All Products',
        path: '/products',
        hasProducts: products.length > 0,
        activeShop: true,
        productCSS: true
      });
    });
  };

  exports.getProduct = (req, res, next) => {
      const prodId = req.params.productId
        Product.findById(prodId, product => {
            res.render('shop/product-detail', {
                product: product,
                pageTitle: 'product',
                path: '/products'
            })
      })
  }

exports.getIndex = (req, res, next) => {
    Product.fetchAll(products => {
        res.render('shop/index', {
            prods: products,
            pageTitle: 'Shop',
            path: '/'
        })
    })
}

exports.getCart = (req, res, next) => {
    Cart.getCart(cart => {
        const products = []
        for (p of cart.products) {
            console.log(p)
            Product.findById(p.id, product => {
                console.log(product)
                products.push({productData: product, qty: p.qty})
                console.log("products update: ", products)
            })
        }
        console.log("products: ", products)
        res.render('shop/cart', {
            prods: products,
            pageTitle: 'Cart',
            path: '/cart'
        })
    })
}

exports.postCartAddProduct = (req, res, next) => {
    const prodId = req.body.prodId
    Product.findById(prodId, product => {
        Cart.addProduct(prodId, product.price)
    })
    res.redirect('/cart')
}

exports.postCartDeleteProduct = (req, res, next) => {
    Product.findById(req.body.id, product => {
        Cart.deleteProduct(product.id, product.price)
        res.redirect('/cart')
    })
}

exports.getCheckout = (req, res, next) => {
    Product.fetchAll(products => {
        res.render('shop/checkout', {
            prods: products,
            pageTitle: 'Check Out',
            path: '/checkout'
        })
    })
}

exports.getOrders = (req, res, next) => {
    Product.fetchAll(products => {
        res.render('shop/orders', {
            prods: products,
            pageTitle: 'Orders',
            path: '/orders'
        })
    })
}