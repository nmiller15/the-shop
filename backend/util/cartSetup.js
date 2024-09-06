const db = require('../database/db');

// Create a cart for a new user automatically after account creation
const cartSetup = async (userId) => {
    const type = 'carts';
    const model = { user_id: userId };

    const response = await db.addInstance(type, model);
    if(!response) return false;
    return true;
}

module.exports = cartSetup;