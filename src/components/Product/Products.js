import React, { Fragment, useEffect, useState } from "react";
import "./Products.css";
import { useSelector, useDispatch } from "react-redux";
import { clearErrors, getProduct } from "../../actions/productAction";
import Loader from "../layout/Loader/Loader";
import ProductCard from "../Home/ProductCard";
import Pagination from "react-js-pagination";
import Slider from "@material-ui/core/Slider";
import { useAlert } from "react-alert";
import Typography from "@material-ui/core/Typography";
import MetaData from "../layout/MetaData";
import { useParams } from "react-router-dom";
import { AiOutlineClose } from "react-icons/ai";

const categories = [
  "Dell",
  "MacBook",
  "ASUS",
  "HP",
  "Lenovo",
  "Acer",
  "Microsoft",
  "MSI",
];

const Products = () => {
  const { keyword } = useParams();
  console.log(keyword);
  const dispatch = useDispatch();

  const alert = useAlert();

  const [currentPage, setCurrentPage] = useState(1);
  console.log(currentPage);
  const [price, setPrice] = useState([0, 50000000]);
  const [category, setCategory] = useState("");

  const [ratings, setRatings] = useState(0);

  const {
    products,
    loading,
    error,
    productsCount,
    resultPerPage,
    filteredProductsCount,
  } = useSelector((state) => state.products);
  console.log("resultPerPage", resultPerPage);

  console.log(products);

  const setCurrentPageNo = (e) => {
    setCurrentPage(e);
  };

  const priceHandler = (event, newPrice) => {
    setPrice(newPrice);
  };
  let count = filteredProductsCount;
  console.log("count", count);

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    dispatch(getProduct(keyword, currentPage, price, category, ratings));
  }, [dispatch, keyword, currentPage, price, category, ratings, alert, error]);

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title="PRODUCTS -- ECOMMERCE" />
          <h2 className="productsHeading">Products</h2>

          <div className="px-10 flex gap-10 max-sm:flex-col">
            <div className="filterBox max-sm:mx-auto">
              <Typography>Price</Typography>
              <Slider
                value={price}
                onChange={priceHandler}
                valueLabelDisplay="auto"
                aria-labelledby="range-slider"
                min={0}
                max={50000000}
              />

              <Typography>Categories</Typography>
              <ul className="categoryBox min-w-[250px]">
                {categories.map((category) => (
                  <li
                    className="category-link pb-2 border-b-[1px] border-b-slate-400"
                    key={category}
                    onClick={() => setCategory(category)}
                  >
                    {category}
                  </li>
                ))}
                <li
                  className="flex item-center gap-1 text-black py-1 cursor-pointer"
                  onClick={() => setCategory("")}
                >
                  <AiOutlineClose className="text-center text-black mt-1"></AiOutlineClose>
                  <span className="text-center">clear filter</span>
                </li>
              </ul>

              <fieldset>
                <Typography component="legend">Ratings Above</Typography>
                <Slider
                  value={ratings}
                  onChange={(e, newRating) => {
                    setRatings(newRating);
                  }}
                  aria-labelledby="continuous-slider"
                  valueLabelDisplay="auto"
                  min={0}
                  max={5}
                />
              </fieldset>
            </div>

            <div className="products mx-auto">
              <div
                // className="grid grid-cols-3 gap-10"
                className="mx-auto flex gap-10 flex-wrap justify-center max-md:flex-wrap max-sm:flex-col"
              >
                {products &&
                  products.map((product) => (
                    <ProductCard
                      className=""
                      key={product._id}
                      product={product}
                    />
                  ))}
              </div>
            </div>
          </div>
          {resultPerPage < count && (
            <div className="paginationBox">
              <Pagination
                activePage={currentPage}
                itemsCountPerPage={resultPerPage}
                totalItemsCount={productsCount}
                onChange={setCurrentPageNo}
                nextPageText="Next"
                prevPageText="Prev"
                firstPageText="1st"
                lastPageText="Last"
                itemClass="page-item"
                linkClass="page-link"
                activeClass="pageItemActive"
                activeLinkClass="pageLinkActive"
              />
            </div>
          )}
        </Fragment>
      )}
    </Fragment>
  );
};

export default Products;
