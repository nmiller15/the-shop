const getIdString = (type) => {
    if (type == 'orders') {
        return 'number';
    } else {
        return 'id';
    }
}

const modelSchema = {
    carts: 'id, user_id',
    orders: 'number, date_created, status, user_id',
    products: 'id, name, img_path, description',
    users: 'id, username, password, first_name, last_name, street_address, city, state, zip, date_created, isadmin',
    products_carts: 'product_id, cart_id',
    products_orders: 'product_id, order_number'
}

const formatValues = (type, model) => {
    if (!modelSchema.hasOwnProperty(type)) {
        throw new Error('Invalid Type');
    }
    const values = Object.values(model);
    values.forEach((value, index) => {
        if (typeof value == 'string') {
            value = `'${value}'`
            values[index] = value;
        }
    })
    return values.join(', ');
}

const formatColumns = (type, model) => {
    if (!modelSchema.hasOwnProperty(type)) {
        throw new Error('Invalid Type');
    }
    const columns = Object.keys(model);
    return columns.join(', ')
}

const createWhereClause = (type, id, secondaryId) => {
    if (type == 'products_orders') {
        return `order_number = '${id}' AND id = ${secondaryId}`
    } else if (type == 'products_carts') {
        return `cart_id = '${id}' AND id = ${secondaryId}`
    } else if (type == 'products') {
        return `id = '${id}'`
    } else {
        return `${getIdString(type)} = ${id}`
    }
}

// Return a string that is valid SQL
const createSetStatement = (type, model) => {
    if(!modelSchema.hasOwnProperty(type)) {
        throw new Error('Invalid Type');
    }
    const keys = Object.keys(model);
    let setStatement = '';
    keys.forEach((key, index) => {
        let value = model[key];

        if (typeof value == 'string') value = `'${value}'`;
        if (index == keys.length - 1) {
            setStatement = `${setStatement}${key} = ${value}`
        } else {
            setStatement = `${setStatement}${key} = ${value}, `
        }
    })
    return setStatement;
}

module.exports = {
    getIdString,
    modelSchema,
    formatValues,
    formatColumns,
    createWhereClause,
    createSetStatement
}