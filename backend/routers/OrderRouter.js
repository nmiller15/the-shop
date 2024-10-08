const express = require("express");
const OrderRouter = express.Router();
const OrderController = require("../controllers/Order");

OrderRouter.get("/test", (req, res) => {
  res.json("test ok");
});

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
  .post((req, res, next, session_id, csrf_token) => {
    const body = req.body;
    OrderController.addOrder(req, res, next, body, session_id, csrf_token);
  });

OrderRouter.route("/:id")
  .get((req, res, next, session_id, csrf_token, id) => {
    OrderController.getOrderById(req, res, next, session_id, csrf_token, id);
  })
  .put((req, res, next, id, session_id, csrf_token) => {
    const body = req.body;
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
