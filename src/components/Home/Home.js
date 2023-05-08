import { CiAlarmOn } from "react-icons/ci";
import React, { Fragment, useEffect } from "react";
import "./Home.css";
import MetaData from "../layout/MetaData";
import { clearErrors, getProduct } from "../../actions/productAction";
import { useSelector, useDispatch } from "react-redux";
import Loader from "../layout/Loader/Loader";
import { useAlert } from "react-alert";
import ProductCard from "./ProductCard.js";
import Slider from "react-slick";
import { GrPrevious, GrNext } from "react-icons/gr";

const Home = () => {
  const alert = useAlert();
  const dispatch = useDispatch();
  const { products, loading, error } = useSelector((state) => state.products);
  console.log(products);

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    dispatch(getProduct());
  }, [dispatch, error, alert]);

  const SlickArrowLeft = ({ currentSlide, slideCount, ...props }) => (
    <div {...props}>
      <GrPrevious className="text-lg z-50 absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2"></GrPrevious>
    </div>
  );
  const SlickArrowRight = ({ currentSlide, slideCount, ...props }) => (
    <div {...props}>
      <GrNext className="text-lg z-50 absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2"></GrNext>
    </div>
  );

  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    prevArrow: <SlickArrowLeft />,
    nextArrow: <SlickArrowRight />,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          infinite: false,
          arrows: false,
          slidesToShow: 1,
          slidesToScroll: 1,
          autoplay: true,
          autoplaySpeed: 2000,
        },
      },
      {
        breakpoint: 600,
        settings: {
          infinite: false,
          arrows: false,
          slidesToShow: 1,
          slidesToScroll: 1,
          autoplay: true,
          autoplaySpeed: 2000,
        },
      },
    ],
  };

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title="ECOMMERCE" />

          <div className="banner">
            {/* <p>Welcome to Ecommerce</p>
            <h1>FIND AMAZING PRODUCTS BELOW</h1> */}

            {/* <a className="bg-transparent" href="#container">
              <button className="bg-transparent flex items-center justify-center gap-5">
                Scroll <CiAlarmOn />
              </button>
            </a> */}
            <div className="w-full h-full mt-0">
              <Slider {...settings}>
                {products &&
                  products.map((item) => (
                    <div key={item._id} className="w-full h-full">
                      <img
                        src={item.images[0].url}
                        alt=""
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ))}
                {/* <div className="w-full h-full">
                  <img
                    src="https://img.tgdd.vn/imgt/f_webp,fit_outside,quality_100/https://cdn.tgdd.vn/2023/04/banner/TGDD--Desk--deal-ngon-1200x120.png"
                    alt=""
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="w-full h-full">
                  <img
                    src="https://img.tgdd.vn/imgt/f_webp,fit_outside,quality_100/https://cdn.tgdd.vn/2023/04/banner/Realme-C55-GRQ-720-220-720x220-2.png"
                    alt=""
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="w-full h-full">
                  <img
                    src="https://img.tgdd.vn/imgt/f_webp,fit_outside,quality_100/https://cdn.tgdd.vn/2023/04/banner/TGDD--Desk--deal-ngon-1200x120.png"
                    alt=""
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="w-full h-full">
                  <img
                    src="https://img.tgdd.vn/imgt/f_webp,fit_outside,quality_100/https://cdn.tgdd.vn/2023/04/banner/Realme-C55-GRQ-720-220-720x220-2.png"
                    alt=""
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="w-full h-full">
                  <img
                    src="https://img.tgdd.vn/imgt/f_webp,fit_outside,quality_100/https://cdn.tgdd.vn/2023/04/banner/TGDD--Desk--deal-ngon-1200x120.png"
                    alt=""
                    className="w-full h-full object-cover"
                  />
                </div> */}
              </Slider>
            </div>
          </div>

          <h2 className="homeHeading">Featured Products</h2>

          {/* <div className="container" id="container"> */}
          <div className="w-[80%] mx-auto grid grid-cols-4 gap-4 max-lg:grid-cols-3 max-md:grid-cols-2 max-sm:grid-cols-1">
            {products &&
              products.map((product) => (
                <ProductCard className='' key={product._id} product={product} />
              ))}
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default Home;
