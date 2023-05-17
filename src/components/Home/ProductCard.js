import React from "react";
import { Link } from "react-router-dom";
import { Rating } from "@material-ui/lab";

const ProductCard = ({ product, className = "" }) => {
  const options = {
    size: "small",
    value: product?.ratings,
    readOnly: true,
    precision: 0.5,
  };

  return (
    <div
      className={`${className} relative max-w-[300px] productCard w-full flex flex-col gap-5 p-2 transition-all hover:transition-all hover:shadow-lg hover:-mt-2 max-sm:mb-8 max-sm:max-w-[300px] max-sm:mx-auto`}
    >
      <div className="w-full mx-auto mb-2">
        <Link to={`/product/${product._id}`} className="w-full mx-auto block">
          <img
            className="w-full h-[200px] object-fill block"
            src={product.images[0].url}
            alt={product.name}
          />
        </Link>
      </div>

      <div className="w-full h-1/2 flex flex-col items-start">
        <span className="mb-8">{product.name}</span>
        <div className="flex flex-col pb-2 box-border">
          <Rating {...options}></Rating>{" "}
          <span className="productCardSpan">
            ({product.numOfReviews} Reviews)
          </span>
        </div>
        <span className="text-center hover:text-red-400 mb-0">{`${product.price.toLocaleString(
          "en-US",
          {
            style: "currency",
            currency: "USD",
          }
        )}`}</span>
      </div>
      {product.Stock === 0 && (
        <Link to={`/product/${product._id}`} className="absolute top-0 left-0 bg-slate-500 bg-opacity-20 flex items-center justify-center w-full h-full">
          <span className="text-center text-4xl text-white font-bold">Sold out</span>
        </Link>
      )}
    </div>
  );
};

export default ProductCard;
