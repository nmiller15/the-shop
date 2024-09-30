const express = require("express");
const AddressRouter = express.Router();
const AddressController = require("../controllers/Address");

AddressRouter.get("/", (req, res, next, session_id, csrf_token) => {
  AddressController.getAllAddresses(req, res, next, session_id, csrf_token);
});

AddressRouter.route("/:userId")
  .get((req, res, next, session_id, csrf_token, userId) => {
    AddressController.getAddressesByUserId(
      req,
      res,
      next,
      session_id,
      csrf_token,
      userId
    );
  })
  .post((req, res, next, body, userId, session_id, csrf_token) => {
    AddressController.addAddressByUserId(
      req,
      res,
      next,
      body,
      userId,
      session_id,
      csrf_token
    );
  });

AddressRouter.route("/:userId/:id")
  .put((req, res, next, body, userId, id, session_id, csrf_token) => {
    AddressController.updateAddressById(
      req,
      res,
      next,
      body,
      userId,
      id,
      session_id,
      csrf_token
    );
  })
  .delete((req, res, next, session_id, csrf_token, userId, id) => {
    AddressController.removeAddressById(
      req,
      res,
      next,
      session_id,
      csrf_token,
      userId,
      id
    );
  });

module.exports = AddressRouter;
