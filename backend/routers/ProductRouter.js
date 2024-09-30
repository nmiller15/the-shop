const express = require("express");
const ProductRouter = express.Router();
const ProductController = require("../controllers/Product");

ProductRouter.get("/test", (req, res) => {
  res.json("test ok");
});

ProductRouter.route("/")
  .get((req, res, next, category) => {
    ProductController.getAllProducts(req, res, next, category);
  })
  .post((req, res, next, body, session_id, csrf_token) => {
    ProductController.addProduct(req, res, next, body, session_id, csrf_token);
  });

ProductRouter.route("/category")
  .get((req, res, next) => {
    ProductController.getAllCategories(req, res, next);
  })
  .post((req, res, next, body, session_id, csrf_token) => {
    ProductController.addCategory(req, res, next, body, session_id, csrf_token);
  });

ProductRouter.route("/category/:categoryId")
  .put((req, res, next, body, categoryId, session_id, csrf_token) => {
    ProductController.updateCategoryById(
      req,
      res,
      next,
      body,
      categoryId,
      session_id,
      csrf_token
    );
  })
  .delete((req, res, next, session_id, csrf_token, categoryId) => {
    ProductController.removeCategoryById(
      req,
      res,
      next,
      session_id,
      csrf_token,
      categoryId
    );
  });

ProductRouter.route("/:id")
  .get((req, res, next, id) => {
    ProductController.getProductById(req, res, next, id);
  })
  .put((req, res, next, body, id, session_id, csrf_token) => {
    ProductController.updateProductById(
      req,
      res,
      next,
      body,
      id,
      session_id,
      csrf_token
    );
  });

ProductRouter.post(
  "/:id/image",
  (req, res, next, session_id, csrf_token, id, sequence) => {
    ProductController.addProductImage(
      req,
      res,
      next,
      session_id,
      csrf_token,
      id,
      sequence
    );
  }
);

ProductRouter.put(
  "/:id/reoreder-images",
  (req, res, next, body, id, session_id, csrf_token) => {
    ProductController.reorderProductImages(
      req,
      res,
      next,
      body,
      id,
      session_id,
      csrf_token
    );
  }
);

module.exports = ProductRouter;
