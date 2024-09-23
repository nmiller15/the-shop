'use strict';

var utils = require('../utils/writer.js');
var Product = require('../service/ProductService');

module.exports.addCategory = function addCategory (req, res, next, body, session_id, csrf_token) {
  Product.addCategory(body, session_id, csrf_token)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.addProduct = function addProduct (req, res, next, body, session_id, csrf_token) {
  Product.addProduct(body, session_id, csrf_token)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.addProductImage = function addProductImage (req, res, next, session_id, csrf_token, id, sequence) {
  Product.addProductImage(session_id, csrf_token, id, sequence)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.getAllCategories = function getAllCategories (req, res, next) {
  Product.getAllCategories()
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.getAllProducts = function getAllProducts (req, res, next, category) {
  Product.getAllProducts(category)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.getProductById = function getProductById (req, res, next, id) {
  Product.getProductById(id)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.removeCategoryById = function removeCategoryById (req, res, next, session_id, csrf_token, categoryId) {
  Product.removeCategoryById(session_id, csrf_token, categoryId)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.reorderProductImages = function reorderProductImages (req, res, next, body, id, session_id, csrf_token) {
  Product.reorderProductImages(body, id, session_id, csrf_token)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.updateCategoryById = function updateCategoryById (req, res, next, body, categoryId, session_id, csrf_token) {
  Product.updateCategoryById(body, categoryId, session_id, csrf_token)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.updateProductById = function updateProductById (req, res, next, body, id, session_id, csrf_token) {
  Product.updateProductById(body, id, session_id, csrf_token)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
