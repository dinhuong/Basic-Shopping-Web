const Product = require('../models/product');

exports.getAddProduct = (req, res, next) => {
  res.render('admin/add-product', {
    pageTitle: 'Add Product',
    path: '/admin/add-product',
    formsCSS: true,
    productCSS: true,
    activeAddProduct: true
  });
};

exports.postAddProduct = (req, res, next) => {
  const id = null
  const title = req.body.title
  const imageUrl = req.body.imageUrl
  const price = req.body.price
  const description = req.body.description

  const product = new Product(id, title, imageUrl, description, price);
  //console.log(req.body)
  product.save();
  res.redirect('/');
};

exports.getEditProduct = (req, res, next) => {
  const product = Product.findById(req.query.id, product => {
    res.render('admin/edit-product', {
      product: product,
      pageTitle: 'Edit Product',
      path: '/admin/add-product',
      formsCSS: true,
      productCSS: true,
      activeAddProduct: true
    });
  })
};

exports.postEditProduct = (req, res, next) => {
  const updateProduct = new Product(req.body.id, req.body.title, req.body.imageUrl, req.body.description, req.body.price)
  updateProduct.save()
  res.redirect('/admin/products')
}

exports.getProducts = (req, res, next) => {
  Product.fetchAll(products => {
    res.render('admin/products', {
        prods: products,
        pageTitle: 'All Products',
        path: '/admin/products'    
    })
  })
};

exports.getDeleteProduct = (req, res, next) => {
  Product.deleteById(req.query.id)
  res.redirect('/admin/products')
}

