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
const Session = require("supertokens-node/recipe/session");
const EmailPassword = require("supertokens-node/recipe/emailpassword");
const ThirdParty = require("supertokens-node/recipe/thirdparty");
const { middleware } = require("supertokens-node/framework/express");
const { errorHandler } = require("supertokens-node/framework/express");
const Dashboard = require("supertokens-node/recipe/dashboard");

supertokens.init({
  framework: "express",
  supertokens: {
    // https://try.supertokens.com is for demo purposes. Replace this with the address of your core instance (sign up on supertokens.com), or self host a core.
    connectionURI: "http://localhost:3567",
  },
  appInfo: {
    appName: "the shop",
    apiDomain: "localhost:8080",
    websiteDomain: "localhost:3000",
    apiBasePath: "/auth",
    websiteBasePath: "/auth",
  },
  recipeList: [
    EmailPassword.init(),
    ThirdParty.init({
      // We have provided you with development keys which you can use for testing.
      // IMPORTANT: Please replace them with your own OAuth keys for production use.
      signInAndUpFeature: {
        providers: [
          {
            config: {
              thirdPartyId: "google",
              clients: [
                {
                  clientId:
                    "1060725074195-kmeum4crr01uirfl2op9kd5acmi9jutn.apps.googleusercontent.com",
                  clientSecret: "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",
                },
              ],
            },
          },
          {
            config: {
              thirdPartyId: "github",
              clients: [
                {
                  clientId: "467101b197249757c71f",
                  clientSecret: "e97051221f4b6426e8fe8d51486396703012f5bd",
                },
              ],
            },
          },
          {
            config: {
              thirdPartyId: "apple",
              clients: [
                {
                  clientId: "4398792-io.supertokens.example.service",
                  additionalConfig: {
                    keyId: "7M48Y4RYDL",
                    privateKey:
                      "-----BEGIN PRIVATE KEY-----\nMIGTAgEAMBMGByqGSM49AgEGCCqGSM49AwEHBHkwdwIBAQQgu8gXs+XYkqXD6Ala9Sf/iJXzhbwcoG5dMh1OonpdJUmgCgYIKoZIzj0DAQehRANCAASfrvlFbFCYqn3I2zeknYXLwtH30JuOKestDbSfZYxZNMqhF/OzdZFTV0zc5u5s3eN+oCWbnvl0hM+9IW0UlkdA\n-----END PRIVATE KEY-----",
                    teamId: "YWQCXGJRJL",
                  },
                },
              ],
            },
          },
        ],
      },
    }),
    Session.init(),
    Dashboard.init(),
  ],
});

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
