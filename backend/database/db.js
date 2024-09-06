const { response } = require('express');
const { query } = require('./index');
const {
    getIdString,
    modelSchema,
    formatValues,
    formatColumns,
    createSetStatement,
    createWhereClause
} = require('./util')

const getAllInstances = async (type, userId) => {
    const text = type == "orders" && userId ? `SELECT * FROM orders JOIN users ON orders.user_id = users.id WHERE user_id = ${userId};`
                        : type == "orders" ? `SELECT * FROM ${type} JOIN users ON orders.user_id = users.id;`
                        : `SELECT * FROM ${type}`;
    const response = await query(text);
    return response;
}
    
const getInstanceById = async (type, id, secondaryId, ) => {
    const text = type == 'carts' ? `SELECT products_carts.id AS listing_id, carts.id, user_id, product_id, name AS product_name, img_path, description FROM carts LEFT JOIN products_carts ON products_carts.cart_id = carts.id LEFT JOIN products ON products_carts.product_id = products.id WHERE user_id = ${id};`
               : type == 'orders' ? `SELECT * FROM orders LEFT JOIN products_orders ON orders.number = products_orders.order_number LEFT JOIN products ON products_orders.product_id = products.id LEFT JOIN users ON orders.user_id = users.id WHERE orders.number = ${id};`
               : `SELECT * FROM ${type} WHERE ${createWhereClause(type, id, secondaryId)}`
    const response = await query(text)
    if (type == 'carts' || type == 'orders') return response.rows;
    const instance = response.rows[0];
    if (!instance) return {};
    return instance;
}

const getPassword = async (username) => {
    const text = `SELECT id, password FROM users WHERE username = '${username}';`
    try {
        const response = await query(text);
        if (!response.rows[0].password) return false
        return {
            id: response.rows[0].id,
            password: response.rows[0].password
        }
    } catch (err) {
        return false;
    }
}

const getUserId = async (username) => {
    const text = `SELECT id FROM users WHERE username = '${username}';`
    try {
        const response = await query(text);
        if (!response.rows[0].id) throw new Error('No user found.')
        return response.rows[0].id;
    } catch (err) {
        return err;
    }
}

const addInstance = async (type, model) => {
    const schema = formatColumns(type, model);
    const values = formatValues(type, model);
    const text = `INSERT INTO ${type} (${schema}) VALUES (${values}) RETURNING ${modelSchema[type]}`;
    return await query(text);
}

const updateInstanceById = async (type, id, model) => {
    const text = `UPDATE ${type} SET ${createSetStatement(type, model)} WHERE ${createWhereClause(type, id)}`
    const response = await query(text);
    const instance = getInstanceById(type, id);
    if (!instance) return {};
    return instance;
}

const removeInstanceById = async (type, id, secondaryId) => {
    const text = `DELETE FROM ${type} WHERE ${createWhereClause(type, id, secondaryId)}`
    // Handle products foreign key constraint - remove all instances
    if (type == "products") {
        try {
            const response = await query(text);
            return response;    
        } catch (err) {
            if (err.message.includes("products_carts_product_id_fkey") || err.message.includes("products_orders_products_id_fkey")) {
                const removedFromCarts = await query(`DELETE FROM products_carts WHERE product_id = '${id}';`);
                const removedFromOrders = await query(`DELETE FROM products_orders WHERE product_id = '${id}';`);
                if (removedFromCarts && removedFromOrders) {
                    const response = await query(text);
                    return response;
                }
            }
        }
    } else {
        const response = await query(text);
        return response;
    }

}

module.exports = {
    getInstanceById,
    getAllInstances,
    getPassword,
    getUserId,
    addInstance,
    updateInstanceById,
    removeInstanceById
}