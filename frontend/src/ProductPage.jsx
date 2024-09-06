import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Loading from "./Loading";
import FetchError from "./FetchError";
import PropTypes from "prop-types";

function ProductPage(props) {
  const [product, setProduct] = useState({});
  const [isError, setIsError] = useState(false);
  const id = useParams();

  useEffect(() => {
    fetch(`https://fakestoreapi.com/products/${id}`, {})
      .then((res) => {
        console.log(res);
        return res.json();
      })
      .then((json) => setProduct(json))
      .catch((err) => {
        setIsError(true);
        console.error(err.message);
      });
  });
  return Object.keys(product).length > 0 ? (
    <div>{product.id}</div>
  ) : isError ? (
    <FetchError />
  ) : (
    <Loading />
  );
}

ProductPage.propTypes = {};

export default ProductPage;
