import React from "react";
import PropTypes from "prop-types";

function ProductCard({ product }) {
  ProductCard.propTypes = {
    product: PropTypes.object,
  };

  return (
    <div className="group mx-auto my-2 w-10/12 cursor-pointer rounded-md bg-gray-200 p-4 md:w-5/12 lg:w-3/12">
      <div className="mb-3 flex h-96 w-full place-content-center rounded-md bg-white">
        <div className="absolute flex h-10 w-16 translate-x-24 translate-y-4 items-center justify-center gap-2 rounded-sm bg-gray-200 p-2 md:translate-x-20 lg:translate-x-[6.4rem]">
          <p className="font-semibold">{product.rating.rate}</p>
          <i className="iconoir-star-solid text-md"></i>
        </div>
        <img src={product.image} className="object-scale-down" />
      </div>
      <p className="text-2xl font-bold">{`$${product.price.toFixed(2)}`}</p>
      <h2 className="truncate text-lg font-semibold underline group-hover:text-clip peer-hover:no-underline">
        {product.title}
      </h2>
      <p className="h-12 overflow-clip text-ellipsis text-balance">
        {product.description}
      </p>
      <button className="peer mt-2 h-12 w-full place-content-center rounded-md bg-gray-300 text-center text-lg hover:bg-blue-200">
        Quick Add to Cart
      </button>
    </div>
  );
}

export default ProductCard;
