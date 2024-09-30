"use strict";

var utils = require("../utils/writer.js");
var Order = require("../service/OrderService");

module.exports.addOrder = function addOrder(
  req,
  res,
  next,
  body,
  session_id,
  csrf_token
) {
  Order.addOrder(body, session_id, csrf_token)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.getAllOrders = function getAllOrders(
  req,
  res,
  next,
  session_id,
  csrf_token,
  unfulfilled
) {
  Order.getAllOrders(session_id, csrf_token, unfulfilled)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.getOrderById = function getOrderById(
  req,
  res,
  next,
  session_id,
  csrf_token,
  id
) {
  Order.getOrderById(session_id, csrf_token, id)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.getUserOrders = function getUserOrders(
  req,
  res,
  next,
  session_id,
  csrf_token,
  username,
  includeInactive
) {
  Order.getUserOrders(session_id, csrf_token, username, includeInactive)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.updateOrderById = function updateOrderById(
  req,
  res,
  next,
  body,
  id,
  session_id,
  csrf_token
) {
  Order.updateOrderById(body, id, session_id, csrf_token)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
