const express = require("express");
const AuthRouter = express.Router();
const AuthController = require("../controllers/Authentication");

AuthRouter.get("/test", (req, res) => {
  res.json("test ok");
});

AuthRouter.post("/login", (req, res, next, body) =>
  AuthController.login(req, res, next, body)
);
AuthRouter.post("/logout", (req, res, next) =>
  AuthController.logout(req, res, next)
);

module.exports = AuthRouter;
