import { useState, useEffect } from "react";
import Layout from "./Layout";
import ProductsList from "./ProductsList";

function App() {
  return (
    <Layout>
      <ProductsList />
    </Layout>
  );
}

export default App;
