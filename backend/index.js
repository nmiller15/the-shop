const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cors = require("cors");
const {
  AuthRouter,
  UserRouter,
  AddressRouter,
  ProductRouter,
  OrderRouter,
  CartRouter,
} = require("./routers");

const supertokens = require("supertokens-node");
const { middleware } = require("supertokens-node/framework/express");
const { errorHandler } = require("supertokens-node/framework/express");
const { supertokensConfig } = require("./config/supertokensConfig");

supertokens.init(supertokensConfig);

const app = express();
const port = 8080;

app.use(
  cors({
    origin: "http://localhost:3000",
    allowedHeaders: ["content-type", ...supertokens.getAllCORSHeaders()],
    credentials: true,
  })
);

app.use(middleware());

app.use(bodyParser.json());

app.use(morgan("tiny"));

app.get("/test", (req, res) => res.json("test ok"));
app.use("/auth", AuthRouter);
app.use("/user", UserRouter);
app.use("/address", AddressRouter);
app.use("/product", ProductRouter);
app.use("/order", OrderRouter);
app.use("/cart", CartRouter);

app.use(errorHandler());

// Add your own error handling in the space below
// ---

// ---
app.listen(port, () => {
  console.log(`Server listening on port: ${port}`);
});
