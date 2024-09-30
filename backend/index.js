const express = require("express");
const morgan = require("morgan");
const {
  AuthRouter,
  UserRouter,
  AddressRouter,
  ProductRouter,
  OrderRouter,
  CartRouter,
} = require("./routers");

const app = express();
const port = 8080;

app.use(morgan("tiny"));

app.get("/test", (req, res) => res.json("test ok"));
app.use("/auth", AuthRouter);
app.use("/user", UserRouter);
app.use("/address", AddressRouter);
app.use("/product", ProductRouter);
app.use("/order", OrderRouter);
app.use("/cart", CartRouter);

app.listen(port, () => {
  console.log(`Server listening on port: ${port}`);
});
