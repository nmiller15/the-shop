import { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import { useLocation, Link } from "react-router-dom";

function ProductsList() {
  const [products, setProducts] = useState([]);

  const location = useLocation();
  const category = location.search.slice(location.search.indexOf("=") + 1);

  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((json) => {
        console.log(json);
        setProducts(json);
      });
  }, []);
  return (
    // Could mess around and make this a grid
    <>
      {category && (
        <Link to="/" className="flex justify-end px-10">
          <i className="iconoir-xmark-circle relative text-3xl"></i>
        </Link>
      )}
      <div className="flex-wrap gap-2 md:flex md:justify-items-start md:px-10">
        {products.map((product, index) => {
          if (
            category &&
            category != product.category.replace(" ", "").replace("'", "")
          )
            return;
          return <ProductCard product={product} key={index} />;
        })}
      </div>
    </>
  );
}

export default ProductsList;
