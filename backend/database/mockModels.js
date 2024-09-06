const formatDate = require('date-format');

const date = new Date(2000, 1, 1, 1, 1, 1);
const formattedDate = formatDate(date);

const cartModel = {
    id: 999,
    user_id: 999
}

const orderModel = {
    number: 999,
    date_created: formattedDate,
    status: 'Pending',
    user_id: 999
}

const userModel = {
    id: 999,
    username: 'test_user_9999',
    password: "ffffffffff",
    first_name: 'test',
    last_name: 'user',
    street_address: '123 Anystreet',
    city: 'Anytown',
    state: 'USA',
    zip: 99999,
    date_created: formattedDate,
    isadmin: true
}

const incompleteUserModel = {
    username: 'test_user_noid',
    password: 'fffffffff',
    first_name: 'test',
    street_address: '123 Anystreet',
    city: 'Anytown',
    state: 'USA',
    zip: 99999,
    date_created: formattedDate,
}

const productModel = {
    id: '999',
    name: 'Test Product',
    img_path: '/test/path',
    description: 'This is a description of a product.'
}

const productCartModel = {
    id: 999,
    product_id: '999',
    cart_id: 999
}

const productOrderModel = {
    id: 999,
    product_id: '999',
    order_number: 999
}

module.exports = {
    cartModel,
    orderModel,
    userModel,
    incompleteUserModel,
    productModel,
    productCartModel,
    productOrderModel
}