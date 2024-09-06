const express = require('express');
const cartRouter = express.Router();
const userAuth = require('../util/userAuth');
const db = require('../database/db');

const getCartFromId = async (req, res, next) => {
    if (!req.session.isAuthenticated) return res.status(400).json("You must be logged in to view a cart.");
    const id = req.params.id;
    const response = await db.getInstanceById(type, id);
    if (!response) return res.status(400).json('Unable to retrieve record from database.');
    req.cartId = response[0].id;
    req.cart = response;
    next();
}

const type = 'carts';

cartRouter.get('/test', (req, res) => {
    res.json('cart - test ok');
});

// Mounting middleware
cartRouter.use('/:id', userAuth.checkUserId, getCartFromId);

// Get the contents of a cart using the user id
cartRouter.get('/:id', async (req, res) => {
    res.status(200).send(req.cart);
})

// Add a product to the cart
cartRouter.post('/:id', async (req, res) => {
    try {
        const productId = req.body.product;
        const model = {
            cart_id: req.cartId,
            product_id: productId
        }
        const response = await db.addInstance('products_carts', model);
        if(!response) return res.status(500).json('Could not add to cart.');
    
        // Return the product object that was added to the cart
        const updatedCart = await db.getInstanceById(type, req.params.id);
        const newItem = updatedCart[updatedCart.length - 1];
    
        res.status(200).json({'msg': 'Product added to cart', 'product': newItem });
    } catch (error) {
        res.status(500).json(error);
    }
})

// Remove a product from the cart
cartRouter.delete('/:id', async (req, res) => {
    try {
        const id = req.cartId;
        const secondaryId = req.body.listing_id;
    
        const response = await db.removeInstanceById('products_carts', id, secondaryId);
        if(!response) return res.status(500).json('Could not remove from cart.');
        res.status(200).json({'msg': 'Product removed from cart.', 'response': response});
    } catch (error) {
        res.status(500).json(error.message);
    }
})

module.exports = cartRouter;