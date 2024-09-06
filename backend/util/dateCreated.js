const formatDate = require('date-format');

const dateCreated = (req, res, next) => {
    const date = new Date();
    req.dateCreated = formatDate(date);
    next();
}

module.exports = dateCreated;