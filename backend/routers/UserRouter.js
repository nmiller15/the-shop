const express = require("express");
const UserRouter = express.Router();
const UserController = require("../controllers/User");

UserRouter.get("/user", (req, res, next) =>
  UserController.getAllUsers(req, res, next)
);

UserRouter.post("/user", (req, res, next, body) =>
  UserController.addUser(req, res, next, body)
);

UserRouter.route("/user/:id")
  .get((req, res, next, session_id, csrf_token, id) => {
    UserController.getUserById(req, res, next, session_id, csrf_token, id);
  })
  .put((req, res, next, body, session_id, csrf_token, id) => {
    UserController.updateUserById(
      req,
      res,
      next,
      body,
      session_id,
      csrf_token,
      id
    );
  })
  .delete((req, res, next, session_id, csrf_token, id) => {
    UserController.deleteUserById(req, res, next, session_id, csrf_token, id);
  });

// TODO
// There's also supposed to be a /user/{username} route, this needs refactored
// to /user/username/{username} or similar so that it won't confict with the
// id routes

module.exports = UserRouter;
