import { useState, useEffect } from "react";
import ProductsList from "./ProductsList";
// import LoginForm from './LoginForm';
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ProductsList />} />
        {/* <Route path="/login" element={<LoginForm />} /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
