'use strict';

var utils = require('../utils/writer.js');
var Address = require('../service/AddressService');

module.exports.addAddressByUserId = function addAddressByUserId (req, res, next, body, userId, session_id, csrf_token) {
  Address.addAddressByUserId(body, userId, session_id, csrf_token)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.getAddressesByUserId = function getAddressesByUserId (req, res, next, session_id, csrf_token, userId) {
  Address.getAddressesByUserId(session_id, csrf_token, userId)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.getAllAddresses = function getAllAddresses (req, res, next, session_id, csrf_token) {
  Address.getAllAddresses(session_id, csrf_token)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.removeAddressById = function removeAddressById (req, res, next, session_id, csrf_token, userId, id) {
  Address.removeAddressById(session_id, csrf_token, userId, id)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.updateAddressById = function updateAddressById (req, res, next, body, userId, id, session_id, csrf_token) {
  Address.updateAddressById(body, userId, id, session_id, csrf_token)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
