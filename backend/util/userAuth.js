const db = require('../database/db');
const { query } = require('../database/index');
const bcrypt = require('bcrypt');
const saltRounds = 10;

// Password Hashing and Comparison
const hashPassword = async (req, res, next) => {
    const password = req.body.password;
    bcrypt.hash(password, saltRounds, function(err, hash) {
        if(err) console.error(err);
        req.body.password = hash;
        next(); 
    })
}

// Authenticate users who's passwords match the database record
const authorize = async (req, res, next) => {
    const username = req.body.username;
    const password = req.body.password;

    const response = await db.getPassword(username);
    const hashPassword = response.password;
    const userId = response.id;


    const matches = await bcrypt.compare(password, hashPassword);
    if (matches) {
        req.session.isAuthenticated = true;
        const user = await db.getInstanceById('users', userId);
        req.session.user = user;
    } else {
        res.status(401).json({ "msg": "Incorrect Password" })
    }
    next();
}

// Verify the user is either accessing their own information, or the user is an admin
const checkUserId = async (req, res, next) => {
    if(!req.session.isAuthenticated) return res.status(401).json({"msg": "You must be logged in to view/edit this page."});
    let id;
    if (!req.params.id) {
        const number = req.params.number;
        const response = await query(`SELECT * FROM orders WHERE number = ${number};`);
        if (!response) return res.status(400).json('Could not verify this order\'s owner.')
        id = response.rows[0].user_id;
    } else {
        id = req.params.id;
    }
    const sessionUserId = req.session.user.id;
    if (sessionUserId != id && !req.session.user.isadmin) return res.status(401).json({"msg": "You can only view/edit pages that belong to this account."})
    next();
}

const isAuthenticated = (req, res, next) => {
    if (req.session.isAuthenticated) {
        next();
    } else {
        next('/login');
    }
}

const isAdmin = (req, res, next) => {;
    if (req.session.user.isadmin) {
        next()
    } else {
        res.status(401).json('You are not authorized to access this resource.');
    };
}

module.exports = {
    hashPassword,
    authorize,
    checkUserId, 
    isAuthenticated,
    isAdmin
}