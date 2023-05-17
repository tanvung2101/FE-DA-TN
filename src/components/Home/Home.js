import React, { Fragment, useEffect, Suspense } from "react";
import "./Home.css";
import MetaData from "../layout/MetaData";
import { clearErrors, getProduct } from "../../actions/productAction";
import { useDispatch } from "react-redux";
import Loader from "../layout/Loader/Loader";
import { useAlert } from "react-alert";
import ProductCard from "./ProductCard.js";
import Slider from "react-slick";
import { GrPrevious, GrNext } from "react-icons/gr";
import useSWR from "swr";
import asus from "../../images/images_ads_2023Banners_May_05_15_2023_GF_RTX_Ulitmate_Play_MC_Overwatch2_Ecosystem_hero.jpg";
import itel from "../../images/images_ads_2023Banners_May_546465_ASUS_Hero.jpg";
import lenavo from "../../images/images_ads_2023Banners_May_0512_LenovoIdeaPad570226SK.png";

const fetcher = (...args) => fetch(...args).then((res) => res.json());

const images = [
  { id: 1, image: asus },
  { id: 2, image: itel },
  { id: 3, image: lenavo },
];

const Home = () => {
  const alert = useAlert();
  const dispatch = useDispatch();
  const { data, error, isLoading } = useSWR(
    "http://localhost:4000/api/v1/products",
    fetcher
  );
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
    <Suspense fallback={<Loader />}>
      <Fragment>
        {isLoading ? (
          <Loader />
        ) : (
          <Fragment>
            <MetaData title="ECOMMERCE" />

            <div className="banner">
              <div className="px-10 mt-2 w-full max-h-[600px]">
                <Slider {...settings}>
                  {images &&
                    images?.map((item) => (
                      <div key={item.id} className="w-full h-full">
                        <img
                          src={item.image}
                          alt=""
                          className="w-full max-h-[600px] object-fill max-sm:h-full"
                        />
                      </div>
                    ))}
                </Slider>
              </div>
            </div>

            <h2 className="homeHeading">Featured Products</h2>

            {/* <div className="container" id="container"> */}
            <div className="w-[80%] mx-auto grid grid-cols-4 gap-4 max-lg:grid-cols-3 max-md:grid-cols-2 max-sm:grid-cols-1">
              {data?.products &&
                data?.products.map((product) => (
                  <ProductCard
                    className=""
                    key={product._id}
                    product={product}
                  />
                ))}
            </div>
          </Fragment>
        )}
      </Fragment>
    </Suspense>
  );
};

export default Home;
