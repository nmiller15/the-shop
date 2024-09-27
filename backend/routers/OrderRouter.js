const express = require("express");
const OrderRouter = express.Router();
const OrderController = require("../controllers/Order");

OrderRouter.route("/order")
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

OrderRouter.route("/order/:id")
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

// TODO
// Should also have an /order/{username} route, but this conflicts with id
// refactor a /order/username/{username} or similar

module.exports = OrderRouter;
