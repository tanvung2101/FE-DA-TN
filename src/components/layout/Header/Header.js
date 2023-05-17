import React, { useEffect } from "react";
// import { ReactNavbar } from "overlay-navbar";
import { AiOutlineMenu } from "react-icons/ai";

import logo from "../../../images/logo.png";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../../actions/userAction";
import Vehicle from "./Vehicle";
import { IoIosAdd } from "react-icons/io";
import MetaData from "../MetaData";

// const options = {
//   burgerColorHover: "#eb4034",
//   logo,
//   logoWidth: "20vmax",
//   navColor1: "white",
//   logoHoverSize: "10px",
//   logoHoverColor: "#eb4034",
//   link1Text: "Home",
//   link2Text: "Products",
//   link3Text: "Contact",
//   link4Text: "About",
//   link1Url: "/",
//   link2Url: "/products",
//   link3Url: "/contact",
//   link4Url: "/about",
//   searchIcon: "",
//   link1Size: "1.3vmax",
//   link1Color: "rgba(35, 35, 35,0.8)",
//   nav1justifyContent: "flex-end",
//   nav2justifyContent: "flex-end",
//   nav3justifyContent: "flex-start",
//   nav4justifyContent: "flex-start",
//   link1ColorHover: "#eb4034",
//   link1Margin: "1vmax",
//   profileIconUrl: "/login",
//   profileIconColor: "rgba(35, 35, 35,0.8)",
//   searchIconColor: "rgba(35, 35, 35,0.8)",
//   cartIconColor: "rgba(35, 35, 35,0.8)",
//   profileIconColorHover: "#eb4034",
//   searchIconColorHover: "#eb4034",
//   cartIconColorHover: "#eb4034",
//   cartIconMargin: "1vmax",
// };

const Header = () => {
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // const location = useLocation();
  const handlerSignOut = () => {
    dispatch(logout());
    return navigate("/login");
  };
  useEffect(() => {});
  // if(!user) return <div></div>
  return (
    <header className="bg-[#f7f8f9]">
      <MetaData></MetaData>
      <div className="w-16 max-sm:hidden">
        <Link to="/" className="logo">
          <img src={logo} alt="" />
        </Link>
      </div>

      <input type="checkbox" id="menu-bar" />
      <label htmlFor="menu-bar">
        <AiOutlineMenu />
      </label>

      <nav className="navbar mx-auto max-[601]:ml-auto ">
        <ul className="max-sm:w-[80%] m-auto bg-[#f8f8f8]">
          <li className="relative">
            <Link
              className="font-medium max-sm:font-normal max-sm:hover:text-red-400"
              to="/"
            >
              Home
            </Link>
            <IoIosAdd className="hidden max-sm:inline-block absolute right-0 top-1/2 -translate-x-1/2 -translate-y-1/2 text-lg text-black-500 hover:text-red-400" />
          </li>
          <li className="relative">
            <Link
              className="font-medium max-sm:font-normal max-sm:hover:text-red-400"
              to="/products"
            >
              Products
            </Link>
            <IoIosAdd className="hidden max-sm:inline-block absolute right-0 top-1/2 -translate-x-1/2 -translate-y-1/2 text-lg text-black-500 hover:text-red-400" />
          </li>
          <li className="relative">
            <Link
              className="font-medium max-sm:font-normal max-sm:hover:text-red-400"
              to="/about"
            >
              About
            </Link>

            <IoIosAdd className="hidden max-sm:inline-block absolute right-0 top-1/2 -translate-x-1/2 -translate-y-1/2 text-lg text-black-500 hover:text-red-400" />
          </li>
          <li className="relative">
            <Link
              className="font-medium max-sm:font-normal max-sm:hover:text-red-400"
              to="/contact"
            >
              contact
            </Link>
            <IoIosAdd className="hidden max-sm:inline-block absolute right-0 top-1/2 -translate-x-1/2 -translate-y-1/2 text-lg text-black-500 hover:text-red-400" />
          </li>
          <li className="max-sm:border-0 relative">
            <Link
              className="font-medium max-sm:font-normal max-sm:hover:text-red-400"
              to="/search"
            >
              Search
            </Link>
            <IoIosAdd className="hidden max-sm:inline-block absolute right-0 top-1/2 -translate-x-1/2 -translate-y-1/2 text-lg text-black-500 hover:text-red-400" />
          </li>
        </ul>
      </nav>

      <div className="flex items-center justify-center gap-10">
        {user ? (
          <button
            onClick={handlerSignOut}
            className="py-3 px-5 rounded-lg bg-green-400"
          >
            Sign Out
          </button>
        ) : (
          <button className="py-3 px-5 rounded-lg bg-green-400">
            <Link to="/login">Login</Link>
          </button>
        )}
      </div>
      <Vehicle />
    </header>
  );
};

export default Header;
