const express = require("express");
const UserRouter = express.Router();
const UserController = require("../controllers/User");

UserRouter.get("/test", (req, res) => {
  res.json("test ok");
});

UserRouter.get("/", (req, res, next) =>
  UserController.getAllUsers(req, res, next)
);

UserRouter.post("/", (req, res, next) => {
  const body = req.body;
  UserController.addUser(req, res, next, body);
});

UserRouter.route("/:id")
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

UserRouter.get("/username/:username", (req, res, next, username) => {
  UserController.getUserByUsername(req, res, next, username);
});

module.exports = UserRouter;
