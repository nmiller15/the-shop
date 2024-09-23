'use strict';

var utils = require('../utils/writer.js');
var Cart = require('../service/CartService');

module.exports.addCart = function addCart (req, res, next, session_id, csrf_token) {
  Cart.addCart(session_id, csrf_token)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.addProductToCartById = function addProductToCartById (req, res, next, session_id, csrf_token, id, productId, quantity) {
  Cart.addProductToCartById(session_id, csrf_token, id, productId, quantity)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.addProductToCartByUsername = function addProductToCartByUsername (req, res, next, session_id, csrf_token, username, productId, quantity) {
  Cart.addProductToCartByUsername(session_id, csrf_token, username, productId, quantity)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.getAllCarts = function getAllCarts (req, res, next, session_id, csrf_token) {
  Cart.getAllCarts(session_id, csrf_token)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.getCartById = function getCartById (req, res, next, session_id, csrf_token, id) {
  Cart.getCartById(session_id, csrf_token, id)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.getCartByUsername = function getCartByUsername (req, res, next, session_id, csrf_token, username) {
  Cart.getCartByUsername(session_id, csrf_token, username)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.removeCartById = function removeCartById (req, res, next, session_id, csrf_token, id) {
  Cart.removeCartById(session_id, csrf_token, id)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.removeCartByUsername = function removeCartByUsername (req, res, next, session_id, csrf_token, username) {
  Cart.removeCartByUsername(session_id, csrf_token, username)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.removeProductFromCartById = function removeProductFromCartById (req, res, next, session_id, csrf_token, id, productId, clear) {
  Cart.removeProductFromCartById(session_id, csrf_token, id, productId, clear)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.removeProductFromCartByUsername = function removeProductFromCartByUsername (req, res, next, session_id, csrf_token, username, productId, clear) {
  Cart.removeProductFromCartByUsername(session_id, csrf_token, username, productId, clear)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.updateCartById = function updateCartById (req, res, next, body, id, session_id, csrf_token) {
  Cart.updateCartById(body, id, session_id, csrf_token)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.updateCartByUsername = function updateCartByUsername (req, res, next, body, username, session_id, csrf_token) {
  Cart.updateCartByUsername(body, username, session_id, csrf_token)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
