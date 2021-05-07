const fs = require('fs')
const path = require('path')
const Product = require('./product')

const p = path.join(
    path.dirname(process.mainModule.filename),
    'data',
    'cart.json'
)

module.exports = class Cart {
    static addProduct(id, price){
        //fetch the previous cart
        fs.readFile(p, (err, fileContent) => {
            let cart = {products:[], totalPrice:0}
            if (!err) {
                cart = JSON.parse(fileContent)
            }

            //analyze the cart
            const existProdIndex = cart.products.findIndex(prod => prod.id === id)
            const existProd = cart.products[existProdIndex]

            //add new product
            let updateProd
            if (existProd) {
                updateProd = {...existProd}
                updateProd.qty = updateProd.qty + 1
                cart.products[existProdIndex] = updateProd
            } else {
                updateProd = {id: id, qty: 1}
                cart.products = [...cart.products, updateProd]
            }
            cart.totalPrice = cart.totalPrice + +price
            fs.writeFile(p, JSON.stringify(cart), err => {
                console.log("writeFile: " + err)
            })
        })
    }

    static deleteProduct(id, price){
        fs.readFile(p, (err, fileContent) => {
            if (!err) {
                const cart = JSON.parse(fileContent)
                const productIndex = cart.products.findIndex(prod => prod.id === id)
                const productQty = cart.products[productIndex].qty
                cart.products = cart.products.filter(prod => prod.id === id)
                cart.totalPrice = cart.totalPrice - price*productQty
                fs.writeFile(p, JSON.stringify(cart), err => {
                    console.log(err)
                })
            }
        })
    }

    static getCart(cb) {
        fs.readFile(p, (err, fileContent) => {
            if (err) {
                cb({products:[], qty: 0})
            } else {
                cb(JSON.parse(fileContent))
            }
        })
    }
}