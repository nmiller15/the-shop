const express = require('express');
const usersRouter = express.Router();
const db = require('../database/db.js');
const multer = require('multer');
const upload = multer();
const dateCreated = require('../util/dateCreated');
const userAuth = require('../util/userAuth.js');
const cartSetup = require('../util/cartSetup.js');


const type = 'users';

usersRouter.get('/test', (req, res)=> {
    res.json('users - test ok');
})


// Register and new user and add to the database
usersRouter.post('/register', upload.none(), dateCreated, userAuth.hashPassword, async (req, res, next) => {
    const model = req.body;
    model.date_created = req.dateCreated;
    
    // Unique username in development
    if (process.env.NODE_ENV == "development") model.username = Math.floor(Math.random()*1000000)

    const added = await db.addInstance(type, model);
    if (!added ) return res.status(501).json('Not added to the database');
    
    // Add a cart for the user
    const id = await db.getUserId(model.username);
    try {
        const cartAdded = await cartSetup(id); 
        if (!cartAdded) throw new Error('Cart could not be added');
        res.status(201).json(model);
            
    } catch (err) {
        db.removeInstanceById(type, id);
        return res.status(500).json({'msg': 'User not added, failure in setup process.', 'error message': err.message, 'stack trace': err.stack});          
    }
})

// Login a new user, send the user object in the response
usersRouter.post('/login', upload.none(), userAuth.authorize, async (req, res) => {
    const user = req.session.user
    res.status(200).json(user);
})

// Get all users -- admin only
usersRouter.get('/', async (req, res) => {
    if (!req.session.user.isadmin) return res.status(401).json({ "msg": "You are unauthorized to view this information."});
    const response = await db.getAllInstances(type); 
    if(!response) return res.status(500).json('Issue retrieving records');
    res.status(200).json(response.rows);
})

// Checking ID middleware
usersRouter.use('/:id', userAuth.checkUserId);

// Get single user by id
usersRouter.get('/:id', async (req, res) => {
    const id = req.params.id;
    const response = await db.getInstanceById(type, id);
    if (!response) return res.status(500).json('Issue retrieving records');
    res.status(200).json(response);
})

// Edit a user account
usersRouter.put('/:id', upload.none(), async (req, res) => {
    try {
        const id = req.params.id;
        const model = req.body;
        // Do not allow users to change admin status, this must be handled administratively
        if (model.isadmin !== undefined && model.isadmin !== req.session.user.isadmin) return res.status(401).json("Unable to change admin status");
        const response = await db.updateInstanceById(type, id, model)
        if (!response) return res.status(500).json('Issue retrieving records');
        res.status(200).json({"msg": "Updated successfully", "user": response});
    } catch (err) {
        res.status(400).json(err.message);
    }
})

// Delete a user account
usersRouter.delete('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const response = await db.removeInstanceById(type, id);
        if (!response) return res.status(500).json('Issue removing record.')
        res.status(200).json({"msg": "Removed successfully", "response": response});
    } catch (err) {
        res.status(400).json(err.message)
    }
})

module.exports = usersRouter;