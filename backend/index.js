const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const {
  AuthRouter,
  UserRouter,
  AddressRouter,
  ProductRouter,
  OrderRouter,
  CartRouter,
} = require("./routers");

const supertokens = require("supertokens-node");
const Session = require("supertokens-node/recipe/session");
const EmailPassword = require("supertokens-node/recipe/emailpassword");
const ThirdParty = require("supertokens-node/recipe/thirdparty");

supertokens.init({
  framework: "express",
  supertokens: {
    connectionURI: "<ADD YOUR CONNECTION URI HERE",
  },
  appInfo: {
    appName: "the shop",
    apiDomain: "localhost:8080",
    websiteDomain: "localhost:3000",
    apiBasePath: "/auth",
    websiteBasePath: "/auth",
  },
  recipesList: [
    EmailPassword.init(),
    ThirdParty.init({}),
    websiteBasePath.init(),
  ],
});

const app = express();
const port = 8080;

app.use(bodyParser.json());

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
