const express = require('express');
const ordersRouter = express.Router();
const userAuth = require('../util/userAuth');
const dateCreated = require('../util/dateCreated');
const db = require('../database/db');

ordersRouter.get('/test', (req, res) => {
    res.json('orders - test ok');
});

const type = 'orders';

// Get a list of all orders that are your own
ordersRouter.get('/', async (req, res) => {
    const userId = req.session.user.id;
    const response = await db.getAllInstances(type, userId);
    if (!response) return res.status(500).json('Could not get orders from database.');
    const orders = response.rows;
    if (!orders) return res.status(200).json('You have no orders');
    res.status(200).json(orders);
})

// Add an order for the current user
ordersRouter.post('/', userAuth.isAuthenticated, dateCreated, async (req, res) => {
    try {
        // Create an order
        const orderModel = {
            user_id: req.session.user.id,
            date_created: req.dateCreated,
            status: 'Order Submitted'
        }
        const response = await db.addInstance(type, orderModel);
        if (!response) return res.status(500).json("Order could not be created.");
        const order = response.rows[0];
    
        // Add a products_orders listing from an array of product_ids
        const productsString = req.body.products;
        const products = productsString.split(', ');
        products.forEach( async (product) => {
            const model = {
                product_id: product,
                order_number: order.number
            }
            const productOrderListing = await db.addInstance('products_orders', model);
            if (!productOrderListing) return res.status(500).json("Order could not be created.");
        })

        res.status(200).json(order);

    } catch (err) {
        return res.status(400).json(err.message);
    }
})

// Get a list of all orders with an identifying username and address information
// Admin only
ordersRouter.get('/all', userAuth.isAdmin, async (req, res) => {
    const response = await db.getAllInstances(type);
    if (!response) return res.status(500).json('Could not get orders from database.');
    const orders = response.rows;
    res.status(200).json(orders);
})


// Get one order by id -- must be your own or be an admin
ordersRouter.get('/:number', userAuth.checkUserId, async (req, res) => {
    const id = req.params.number;
    const order = await db.getInstanceById(type, id);
    if (!order) return res.status(500).json('Could not get order.');
    res.status(200).json(order);
})

// Edit an order's status -- must be your own or be an admin
ordersRouter.put('/:number', userAuth.checkUserId, async (req, res) => {
    const id = req.params.number;
    const model = req.body;
    const updatedOrder = await db.updateInstanceById(type, id, model);
    if (!updatedOrder) return res.status(500).json('Could not update order.');
    res.status(201).json(updatedOrder);
})

// Delete an order -- check that status is cancelled, order is own or is admin




module.exports = ordersRouter;