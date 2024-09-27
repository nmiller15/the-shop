const express = require("express");
const CartRouter = express.Router();
const CartController = require("../controllers/Cart");

CartRouter.route("/cart")
  .get((req, res, next, session_id, csrf_token) => {
    CartController.getAllCarts(req, res, next, session_id, csrf_token);
  })
  .post((req, res, next, session_id, csrf_token) => {
    CartController.addCart(req, res, next, session_id, csrf_token);
  });

CartRouter.route("/cart/:id")
  .get((req, res, next, session_id, csrf_token, id) => {
    CartController.getCartById(req, res, next, session_id, csrf_token, id);
  })
  .put((req, res, next, body, id, session_id, csrf_token) => {
    CartController.updateCartById(
      req,
      res,
      next,
      body,
      id,
      session_id,
      csrf_token
    );
  })
  .delete((req, res, next, session_id, csrf_token, id) => {
    CartController.removeCartById(req, res, next, session_id, csrf_token, id);
  });

CartRouter.route("/cart/:id/:productId")
  .post((req, res, next, session_id, csrf_token, id, productId, quantity) => {
    CartController.addProductToCartById(
      req,
      res,
      next,
      session_id,
      csrf_token,
      id,
      productId,
      quantity
    );
  })
  .delete((req, res, next, session_id, csrf_token, id, productId, clear) => {
    CartController.removeProductFromCartById(
      req,
      res,
      next,
      session_id,
      csrf_token,
      id,
      productId,
      clear
    );
  });

// TODO: Update this route in the openAPI spec
CartRouter.route("/cart/username/:username")
  .get((req, res, next, session_id, csrf_token, username) => {
    CartController.getCartByUsername(
      req,
      res,
      next,
      session_id,
      csrf_token,
      username
    );
  })
  .put((req, res, next, body, username, session_id, csrf_token) => {
    CartController.updateCartByUsername(
      req,
      res,
      next,
      body,
      username,
      session_id,
      csrf_token
    );
  })
  .delete((req, res, next, session_id, csrf_token, username) => {
    CartController.removeCartByUsername(
      req,
      res,
      next,
      session_id,
      csrf_token,
      username
    );
  });

// TODO: Update this route in the openAPI spec
CartRouter.Route("/cart/username/:username/product/:productId")
  .post(
    (req, res, next, session_id, csrf_token, username, productId, quantity) => {
      CartController.addProductToCartByUsername(
        req,
        res,
        next,
        session_id,
        csrf_token,
        username,
        productId,
        quantity
      );
    }
  )
  .delete(
    (req, res, next, session_id, csrf_token, username, productId, clear) => {
      CartController.removeProductFromCartByUsername(
        req,
        res,
        next,
        session_id,
        csrf_token,
        username,
        productId,
        clear
      );
    }
  );

module.exports = CartRouter;
