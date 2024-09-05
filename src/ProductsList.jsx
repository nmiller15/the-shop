import { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import { useLocation, Link } from "react-router-dom";

function ProductsList() {
  const [products, setProducts] = useState([]);
  const [isError, setIsError] = useState(false);

  const location = useLocation();
  const category = location.search.slice(location.search.indexOf("=") + 1);

  useEffect(() => {
    fetch("https://fakestoreapi.com/products", {})
      .then((res) => res.json())
      .then((json) => {
        console.log(json);
        setProducts(json);
      })
      .catch((err) => {
        console.error(err.message);
        setIsError(true);
      });
  }, []);

  return products.length > 0 ? (
    // Could mess around and make this a grid
    <>
      {category && (
        <Link to="/" className="flex justify-end px-10">
          <i className="iconoir-xmark-circle relative text-3xl"></i>
        </Link>
      )}
      <div className="mx-auto flex-wrap gap-2 md:flex md:justify-items-start md:px-10 lg:max-w-screen-lg">
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
  ) : isError ? (
    <div className="flex h-[70vh] w-full flex-col place-items-center justify-center">
      <i className="iconoir-emoji-sad mb-3 text-9xl"></i>
      <h2 className="text-xl text-slate-400">Unable to fetch shop data...</h2>
      <p className="text-md text-slate-400">
        We&apos;re sorry. Please try back again later.
      </p>
    </div>
  ) : (
    <div className="flex h-[70vh] w-full flex-col place-items-center justify-center">
      <i className="iconoir-refresh-double mb-6 animate-spin text-7xl"></i>
      <h2 className="text-xl text-slate-400">Loading Store Data...</h2>
    </div>
  );
}

export default ProductsList;
