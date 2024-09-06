const express = require('express');
const accountsRouter = express.Router();

accountsRouter.get('/test', (req, res)=> {
    res.json('accounts - test ok')
});

module.exports = accountsRouter;
