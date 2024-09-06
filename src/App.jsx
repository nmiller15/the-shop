import { useState, useEffect } from "react";
import ProductsList from "./ProductsList";
import ProductPage from "./ProductPage";
import LoginForm from "./LoginForm";
import Layout from "./Layout";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<ProductsList />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/products/:id" element={<ProductPage />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
