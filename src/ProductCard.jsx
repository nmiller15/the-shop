import { useState } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

function ProductCard({ product }) {
  ProductCard.propTypes = {
    product: PropTypes.object,
  };

  const [quickAddHover, setQuickAddHover] = useState(false);
  const [itemInCart, setItemInCart] = useState(false);

  // const handleAddToCart = () => {
  // TODO: Will eventually want to implement logic based on how many of the product are in the cart
  // }

  return (
    <div
      onMouseOver={() => setQuickAddHover(true)}
      onMouseOut={() => setQuickAddHover(false)}
      className="group mx-auto mb-20 mt-2 w-8/12 cursor-pointer rounded-md p-2 md:mb-8 md:mt-2 md:w-48"
    >
      <Link to={`/products/${product.id}`}>
        <div className="mb-3 flex h-60 w-full place-content-center rounded-md bg-white">
          <div className="absolute flex h-6 translate-x-24 translate-y-4 items-center justify-center gap-1 rounded-lg bg-gray-200 p-1 md:translate-x-20 lg:translate-x-[4.5rem]">
            <p className="text-[.75rem] font-semibold">{product.rating.rate}</p>
            <i className="iconoir-star-solid text-xs"></i>
          </div>
          <img
            src={product.image}
            className="max-w-8/12 object-scale-down md:max-w-40"
          />
        </div>
        <p className="text-xs font-semibold text-slate-400">{`$${product.price.toFixed(2)}`}</p>
        <h2 className="truncate text-sm font-semibold group-hover:underline">
          {product.title}
        </h2>
        <p className="h-11 overflow-clip text-ellipsis text-balance text-[.7rem] leading-tight text-slate-500">
          {product.description}
        </p>
      </Link>
      {(quickAddHover || itemInCart) && (
        <button
          className={`absolute mt-2 hidden -translate-y-40 translate-x-[9.2rem] place-content-center rounded-md ${itemInCart ? "bg-slate-200" : "bg-slate-100"} p-2 pb-1 text-center text-lg ${quickAddHover || itemInCart ? "opacity-1" : "opacity-0"} transition-all duration-100 hover:bg-slate-300 md:block`}
          onClick={() => setItemInCart((prev) => !prev)}
        >
          <i
            className={`${itemInCart ? "iconoir-cart-minus" : "iconoir-cart-plus"} text-xl text-slate-600`}
          ></i>
        </button>
      )}
    </div>
  );
}

export default ProductCard;
