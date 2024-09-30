const express = require("express");
const OrderRouter = express.Router();
const OrderController = require("../controllers/Order");

OrderRouter.route("/")
  .get((req, res, next, session_id, csrf_token, unfulfilled) => {
    OrderController.getAllOrders(
      req,
      res,
      next,
      session_id,
      csrf_token,
      unfulfilled
    );
  })
  .post((req, res, next, body, session_id, csrf_token) => {
    OrderController.addOrder(req, res, next, body, session_id, csrf_token);
  });

OrderRouter.route("/:id")
  .get((req, res, next, session_id, csrf_token, id) => {
    OrderController.getOrderById(req, res, next, session_id, csrf_token, id);
  })
  .put((req, res, next, body, id, session_id, csrf_token) => {
    OrderController.updateOrderById(
      req,
      res,
      next,
      body,
      id,
      session_id,
      csrf_token
    );
  });

OrderRouter.get(
  "/username/:username",
  (req, res, next, session_id, csrf_token, username, includeInactive) => {
    OrderController.getUserOrders(
      req,
      res,
      next,
      session_id,
      csrf_token,
      username,
      includeInactive
    );
  }
);

module.exports = OrderRouter;
