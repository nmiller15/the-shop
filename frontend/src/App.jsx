import { useState, useEffect } from "react";
import ProductsList from "./ProductsList";
import ProductPage from "./ProductPage";
import LoginForm from "./LoginForm";
import Layout from "./Layout";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import SuperTokens, { SuperTokensWrapper } from "supertokens-auth-react";
import ThirdParty, {
  Github,
  Google,
  Facebook,
  Apple,
} from "supertokens-auth-react/recipe/thirdparty";
import EmailPassword from "supertokens-auth-react/recipe/emailpassword";
import Session from "supertokens-auth-react/recipe/session";

SuperTokens.init({
  appInfo: {
    appName: "the shop",
    apiDomain: "localhost:8080",
    websiteDomain: "localhost:3000",
    apiBasePath: "/auth",
    websiteBasePath: "/auth",
  },
  recipeList: [
    ThirdParty.init({
      signInAndUpFeature: {
        providers: [
          Github.init(),
          Google.init(),
          Facebook.init(),
          Apple.init(),
        ],
      },
    }),
    EmailPassword.init(),
    Session.init(),
  ],
});

function App() {
  return (
    <SuperTokensWrapper>
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<ProductsList />} />
            <Route path="/login" element={<LoginForm />} />
            <Route path="/products/:id" element={<ProductPage />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </SuperTokensWrapper>
  );
}

export default App;
