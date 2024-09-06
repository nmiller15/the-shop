const assert = require('assert');
const db = require('./db');
const { query } = require('./index.js');
const util = require('./util.js');
const {
    cartModel,
    orderModel,
    userModel,
    incompleteUserModel,
    productModel,
    productCartModel,
    productOrderModel
} = require('./mockModels.js');

describe('query', () => {
    it('connects to the database', async () => {
        const databaseConnected = await query('SELECT NOW()');
        assert.ok(databaseConnected);
    })
})

describe('util', () => {
    describe('getIdString', () => {

        it('returns number if given an orders type', () => {
            const type = 'orders';
            const expected = 'number';

            const actual = util.getIdString(type);

            assert.ok(expected == actual);
        })

        it('returns id if given any other type', () => {
            const type1 = 'another value';
            const type2 = 'cart';
            const expected = 'id';

            const actual1 = util.getIdString(type1)
            const actual2 = util.getIdString(type2)

            assert.equal(expected, actual1);
            assert.equal(expected, actual2);
        })


    })

    describe('formatValues', () => {

        it('formats a users type into valid SQL values', () => {
            const type = 'users'
            const model = userModel;
            const expected = "999, 'test_user_9999', 'ffffffffff', 'test', 'user', '123 Anystreet', 'Anytown', 'USA', 99999, '2000-02-01T01:01:01.000', true"

            const actual = util.formatValues(type, model);

            assert.equal(expected, actual);
        })

        it('formats a products type into valid SQL values', () => {
            const type = 'products'
            const model = productModel;
            const expected = "'999', 'Test Product', '/test/path', 'This is a description of a product.'"
            
            const actual = util.formatValues(type, model);

            assert.equal(expected, actual);
        })
    })

    describe('formatColumns', () => {

        it('formats a users type into valid SQL columns', () => {
            const type = 'users'
            const model = incompleteUserModel
            const expected = "username, password, first_name, street_address, city, state, zip, date_created"

            const actual = util.formatColumns(type, model);

            assert.equal(actual, expected);
        })
    })

    describe('createWhereClause', () => {
        it('creates a custom where clause for the products_orders type', () => {
            const type = 'products_orders'
            const id = '999'
            const secondaryId = 999
            const expected = "order_number = '999' AND id = 999";

            const actual = util.createWhereClause(type, id, secondaryId)

            assert.equal(expected, actual);
        })
        it('creates a custom where clause for the products_carts type', () => {
            const type = 'products_carts'
            const id = '999'
            const secondaryId = 999
            const expected = "cart_id = '999' AND id = 999";

            const actual = util.createWhereClause(type, id, secondaryId)

            assert.equal(expected, actual);
        })
        it('creates a custom where clause for the products type', () => {
            const type = 'products'
            const id = '999'
            const expected = "id = '999'";

            const actual = util.createWhereClause(type, id)

            assert.equal(expected, actual);
        })
        it('returns id = {:id} for all others', () => {
            const type = ''
            const id = 999
            const expected = "id = 999";

            const actual = util.createWhereClause(type, id)

            assert.equal(expected, actual);
        })
    })
})

describe('db', () => {
    
    describe('addInstance', () => {
        
        it('adds a user to the database', async () => {
            const type = 'users';
            const model = userModel

            const response = await db.addInstance(type, model);

            assert.ok(response);
        })

        it('adds a product to the database', async () => {
            const type = 'products';
            const model = productModel
            
            const response = await db.addInstance(type, model);

            assert.ok(response);
        })

        it('adds a cart to the database', async () => {
            const type = 'carts';
            const model = cartModel
            
            const response = await db.addInstance(type, model);

            assert.ok(response);
        })

        it('adds an order to the databse', async () => {
            const type = 'orders';
            const model = orderModel;

            const response = await db.addInstance(type, model);

            assert.ok(response);
        })

        it('adds a products_carts row', async () => {
            const type = 'products_carts'
            const model = productCartModel;

            const response = await db.addInstance(type, model);

            assert.ok(response);
        })

        it('adds a products_orders row', async () => {
            const type = 'products_orders'
            const model = productOrderModel;

            const response = await db.addInstance(type, model);

            assert.ok(response);
        })
    })

    describe('getAllInstances', () => {
        it('can access the rows on the users table', async () => {
            const type = 'users';

            const response = await db.getAllInstances(type);

            assert.ok(response.rows);
        })
        it('can access the rows on the products table', async () => {
            const type = 'products';

            const response = await db.getAllInstances(type);

            assert.ok(response.rows)
        })
    })

    describe('getInstanceById', async () => {
        it('retrieves a user from the database with a matching id', async () => {
            const type = 'users'
            const id = 999
            const expected = 999

            const response = await db.getInstanceById(type, id);
            const actual = response.id;
            
            assert.equal(expected, actual);
        })
        it('retrieves a product from the database with a matching id', async () => {
            const type = 'products'
            const id = '999'
            const expected = '999'

            const response = await db.getInstanceById(type, id);
            const actual = response.id;
            
            assert.equal(expected, actual);
        })
        it('retrieves a cart from the database with a matching id', async () => {
            const type = 'carts'
            const id = 999
            const expected = 999

            const response = await db.getInstanceById(type, id);
            const actual = response[0].id;
            
            assert.equal(expected, actual);
        })
        it('retrieves a cart\'s contents from the database with a matching id', async () => {
            const type = 'carts'
            const id = 999
            const expected = '999'

            const response = await db.getInstanceById(type, id);
            const actual = response[0].product_id;

            assert.equal(actual, expected);
        })
        it('retrieves an order from the database with a matching id', async () => {
            const type = 'orders'
            const id = 999
            const expected = 999

            const response = await db.getInstanceById(type, id);
            const actual = response[0].order_number;
            
            assert.equal(expected, actual);
        })
        it('retrieves an order\'s contents from the database with a matching id', async () => {
            const type = 'orders'
            const id = 999
            const expected = '999'

            const response = await db.getInstanceById(type, id);
            const actual = response[0].product_id;

            assert.equal(expected, actual);
        })
    })

    describe('getPassword', () => {
        it('returns false when no user is found', async () => {
            const username = 'thisisnotauser';
            const expected = false;

            const actual = await db.getPassword(username);

            assert.equal(actual, expected);
        })
        it('returns the password of a user with a matching username', async () => {
            const username = 'test_user_9999';
            const expected = "ffffffffff";

            const response = await db.getPassword(username);
            const actual = response.password;

            assert.equal(actual, expected);
        })
        it('returns the id of a user with a matching username', async () => {
            const username = 'test_user_9999';
            const expected = 999;

            const response = await db.getPassword(username);
            const actual = response.id;

            assert.equal(actual, expected);
        })
    })

    describe('updateInstanceById', () => {
        it('edits a user record', async () => {
            const type = 'users'
            const id = 999
            const model = userModel
            const expected = 'edited';

            model.first_name = 'edited'

            const response = await db.updateInstanceById(type, id, model);
            const actual = response.first_name;
    
            assert.equal(actual, expected);
        })
        it('edits a product record', async () => {
            const type = 'products'
            const id = '999'
            const model = productModel
            const expected = 'edited';

            model.name = 'edited'

            const response = await db.updateInstanceById(type, id, model);
            const actual = response.name;
    
            assert.equal(actual, expected);
        })
    })

    describe('removeInstanceById', async () => {
        it('removes a product_order with a matching id', async () => {
            const type = 'products_orders'
            const id = 999                  // order_number
            const secondaryId = 999         // listing_id
            const expected = 'DELETE'

            const response = await db.removeInstanceById(type, id, secondaryId);
            const actual = response.command;

            assert.equal(expected, actual);
        })
        it('removes a product_cart with a matching id', async () => {
            const type = 'products_carts'
            const id = '999'
            const secondaryId = 999
            const expected = 'DELETE'

            const response = await db.removeInstanceById(type, id, secondaryId);
            const actual = response.command;

            assert.equal(expected, actual);
        })
        it('removes an order with a matching id', async () => {
            const type = 'orders'
            const id = 999
            const expected = 'DELETE'

            const response = await db.removeInstanceById(type, id);
            const actual = response.command;

            assert.equal(expected, actual);
        })
        it('removes a product with a matching id', async () => {
            const type = 'products'
            const id = '999'
            const expected = 'DELETE'

            const response = await db.removeInstanceById(type, id);
            const actual = response.command;

            assert.equal(expected, actual);
        })
        it('removes a cart with a matching id', async () => {
            const type = 'carts'
            const id = 999
            const expected = 'DELETE'

            const response = await db.removeInstanceById(type, id);
            const actual = response.command;

            assert.equal(expected, actual);
        })
        it('removes a user with a matching id', async () => {
            const type = 'users'
            const id = 999
            const expected = 'DELETE'

            const response = await db.removeInstanceById(type, id);
            const actual = response.command;

            assert.equal(expected, actual);
        })
    })

})