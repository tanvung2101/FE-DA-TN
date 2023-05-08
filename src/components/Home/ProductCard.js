import React from "react";
import { Link } from "react-router-dom";
import { Rating } from "@material-ui/lab";

const ProductCard = ({ product, className = '' }) => {
  const options = {
    size: "small",
    value: product?.ratings,
    readOnly: true,
    precision: 0.5,
  };

  return (
    <div className={`${className} max-w-[300px] productCard w-full flex flex-col gap-5 p-2 transition-all hover:transition-all hover:shadow-lg hover:-mt-2 max-sm:mb-8 max-sm:max-w-[300px] max-sm:mx-auto`}>
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
        <span className="mb-8"
        >
          {product.name }
        </span>
        <div className="flex flex-col pb-2 box-border">
          <Rating {...options}></Rating>{" "}
          <span className="productCardSpan">
            ({product.numOfReviews} Reviews)
          </span>
        </div>
        <span className="text-center hover:text-red-400 mb-0">{`Gia: ${product.price.toLocaleString(
          "it-IT",
          {
            style: "currency",
            currency: "VND",
          }
        )}`}</span>
      </div>
    </div>
  );
};

export default ProductCard;
