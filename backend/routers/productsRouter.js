const express = require('express');
const productsRouter = express.Router();
const db = require('../database/db');
const userAuth = require('../util/userAuth');

productsRouter.get('/test', (req, res) => {
    res.json('products - test ok')
});

const type = 'products';

const getProductMiddleware = async (req, res, next) => {
    const id = req.params.id;
    const response = await db.getInstanceById(type, id);
    if (!response) return res.status(500).send('Could not communicate with the database.');
    req.product = response;
    next();
}

// Get all products
productsRouter.get('/', async (req, res) => {
    const response = await db.getAllInstances(type);
    if (!response) return res.status(500).send('Could not access product list.')
    const products = response.rows;
    res.json(products);
})

// Add a product, admin only
productsRouter.post('/', userAuth.isAdmin, async (req, res) => {
    // Create unique name and id in development
    if (process.env.NODE_ENV == "development") {
        const id = Math.floor(Math.random()*10_000);
        const name = Math.floor(Math.random()*10_000);
        req.body = {
            id,
            name
        }
    }

    const model = req.body
    const response = await db.addInstance(type, model);
    if (!response) return res.status(500).send('Could not add product');
    const getResponse = await db.getAllInstances(type);
    const products = getResponse.rows;
    const product = products[products.length - 1];
    res.json({
        "msg": "Successfully added product",
        product
    });
})

productsRouter.use('/:id', getProductMiddleware)

// Get a single product by id
productsRouter.get('/:id', async (req, res) => {
    const product = req.product
    res.json(product);
})

// Edit a product by id -- admin only
productsRouter.put('/:id', userAuth.isAdmin, async (req, res) => {
    const id = req.product.id;
    const model = req.body;

    const response = await db.updateInstanceById(type, id, model);
    if (!response) return res.status(500).send('Could not edit product');
    res.status(201).json(response);
})

// Remove a product from the database
productsRouter.delete('/:id', userAuth.isAdmin, async (req, res) => {
    const id = req.product.id;
    const clearCarts = await db.removeInstanceById()
    const response = await db.removeInstanceById(type, id);
    // console.log(response);
    if (response.command != 'DELETE') return res.status(500).send('Could not remove product');
    res.status(200).json("Product removed.");

})

module.exports = productsRouter