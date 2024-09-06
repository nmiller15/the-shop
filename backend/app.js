const express = require('express');
const app = express();
const session = require('express-session');
const { pool } = require('./database/index');
require('dotenv').config();
const PORT = process.env.PORT;

// Dependencies
const bodyParser = require('body-parser');

// Middleware
app.use(bodyParser.json());
app.use(session({
    store: new (require('connect-pg-simple')(session))({
        // Insert connect-pg-simple options here
        pool
    }),
    secret: process.env.COOKIE_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 24 * 60 * 60 * 1000 }
}))


const accountsRouter = require('./routers/accountsRouter');
const usersRouter = require('./routers/usersRouter');
const cartRouter = require('./routers/cartRouter');
const productsRouter = require('./routers/productsRouter');
const ordersRouter = require('./routers/ordersRouter');

app.use('/accounts', accountsRouter);
app.use('/users', usersRouter);
app.use('/cart', cartRouter);
app.use('/products', productsRouter);
app.use('/orders', ordersRouter);


app.get('/test', (req, res) => {
    res.json('test ok')
})

app.listen(PORT, () => {
    console.log(`The server is listening on port ${PORT}`);
});