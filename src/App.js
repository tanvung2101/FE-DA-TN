import WebFont from "webfontloader";
import "./App.css";
import Header from "./components/layout/Header/Header";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
  Navigate,
} from "react-router-dom";
import React, { useEffect, useState } from "react";
import Footer from "./components/layout/Footer/Footer";
import Home from "./components/Home/Home";
import ProductDetails from "./components/Product/ProductDetails";
import Products from "./components/Product/Products";
import Search from "./components/Product/Search";
import LoginSignUp from "./components/User/LoginSignUp";
import store from "./store";
import { loadUser } from "./actions/userAction";
import UserOptions from "./components/layout/Header/userOptions";
import { useSelector } from "react-redux";
import Profile from "./components/User/Profile";
// import ProtectedRoute from "./components/Route/ProtectedRoute";
import UpdateProfile from "./components/User/UpdateProfile";
import UpdatePassword from "./components/User/UpdatePassword";
import ForgotPassword from "./components/User/ForgotPassword";
import ResetPassword from "./components/User/ResetPassword";
import Cart from "./components/Cart/Cart";
import Shipping from "./components/Cart/Shipping";
import ConfirmOrder from "./components/Cart/ConfirmOrder";
import Payment from "./components/Cart/Payment";
import axios from "axios";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import OrderSuccess from "./components/Cart/OrderSuccess";
import MyOrders from "./components/Order/MyOrders";
import OrderDetails from "./components/Order/OrderDetails";
import DashBoard from "./components/Admin/DashBoard";
import ProductList from "./components/Admin/ProductList";
import NewProduct from "./components/Admin/NewProduct";
import UpdateProduct from "./components/Admin/UpdateProduct";
import OrderList from "./components/Admin/OrderList";
import ProcessOrder from "./components/Admin/ProcessOrder";
import UsersList from "./components/Admin/UsersList";
import UpdateUser from "./components/Admin/UpdateUser";
import ProductReviews from "./components/Admin/ProductReviews";
import Contact from "./components/layout/Contact/Contact";
import About from "./components/layout/About/About";
import NotFound from "./components/layout/Not Found/NotFound";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import MacBooks from "./pages/macbooks";
import Registerd from "./components/User/Register";


function RequireAuth({ children }) {
  const { user, isAuthenticated } = useSelector((state) => state.user);
  const location = useLocation();

  if (isAuthenticated === false && !user) {
    return <Navigate to="/login" state={{ from: location }} replace/>;
  }

  return children;
}

function RequireAuthAdmin({ children }) {
  const { user } = useSelector((state) => state.user);
  const location = useLocation();

  if (user?.role !== "admin") {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
}

function App() {
  const { isAuthenticated, user } = useSelector((state) => state.user);

  const [stripeApiKey, setStripeApiKey] = useState("");

  async function getStripeApiKey() {
    try {
      
      const { data } = await axios.get("/api/v1/stripeapikey");
      setStripeApiKey(data?.stripeApiKey);
    } catch (error) {
        console.log(error)
    }
  }
  console.log(stripeApiKey)

  useEffect(() => {
    WebFont.load({
      google: {
        families: ["Roboto",],
      },
    });

    store.dispatch(loadUser());
    getStripeApiKey();
  }, []);
  return (
    <Router>
      <Header />
      {isAuthenticated ? <UserOptions user={user}></UserOptions> : null}
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/:keyword" element={<Products />} />
        <Route path="/search" element={<Search />} />
        <Route path="/mac-books" element={<MacBooks />} />


        <Route path="/contact" element={<Contact />} />

        <Route path="/about" element={<About />} />

        <Route
          path="/account"
          element={
            <RequireAuth>
              <Profile />
            </RequireAuth>
          }
        />
        <Route
          path="/me/update"
          element={
            <RequireAuth>
              <UpdateProfile />
            </RequireAuth>
          }
        />
        <Route
          path="/password/update"
          element={
            <RequireAuth>
              <UpdatePassword />
            </RequireAuth>
          }
        />
        {/* <Route element={<ProtectedRoute />}>
          <Route path="/account" element={<Profile />} />
          <Route path="/me/update" element={<UpdateProfile />} />
          <Route path="/password/update" element={<UpdatePassword />} />
        </Route> */}
        <Route path="/password/forgot" element={<ForgotPassword />} />
        <Route path="/password/reset/:token" element={<ResetPassword />} />

        <Route path="/login" element={<LoginSignUp />} />
        <Route path="/register" element={<Registerd />} />

        <Route path="/cart" element={<Cart />} />

        <Route
          path="/shipping"
          element={
            <RequireAuth>
              <Shipping />
            </RequireAuth>
          }
        />

        <Route
          path="/order/confirm"
          element={
            <RequireAuth>
              <ConfirmOrder></ConfirmOrder>
            </RequireAuth>
          }
        />
        {stripeApiKey && (
          <Route
            path="/process/payment"
            element={
              <RequireAuth>
                <Elements stripe={loadStripe(stripeApiKey)}>
                  <Payment></Payment>
                </Elements>
              </RequireAuth>
            }
          />
        )}

        <Route
          path="/success"
          element={
            <RequireAuth>
              <OrderSuccess></OrderSuccess>
            </RequireAuth>
          }
        />
        <Route
          path="/orders"
          element={
            <RequireAuth>
              <MyOrders></MyOrders>
            </RequireAuth>
          }
        />

        <Route
          path="/order/:id"
          element={
            <RequireAuth>
              <OrderDetails></OrderDetails>
            </RequireAuth>
          }
        />

        <Route
          path="/admin/dashboard"
          element={
            <RequireAuth>
              <RequireAuthAdmin>
                <DashBoard></DashBoard>
              </RequireAuthAdmin>
            </RequireAuth>
          }
        />

        <Route
          path="/admin/products"
          element={
            <RequireAuth>
              <RequireAuthAdmin>
                <ProductList></ProductList>
              </RequireAuthAdmin>
            </RequireAuth>
          }
        />

        <Route
          path="/admin/product"
          element={
            <RequireAuth>
              <RequireAuthAdmin>
                <NewProduct></NewProduct>
              </RequireAuthAdmin>
            </RequireAuth>
          }
        />

        <Route
          path="/admin/product/:id"
          element={
            <RequireAuth>
              <RequireAuthAdmin>
                <UpdateProduct></UpdateProduct>
              </RequireAuthAdmin>
            </RequireAuth>
          }
        />

        <Route
          path="/admin/orders"
          element={
            <RequireAuth>
              <RequireAuthAdmin>
                <OrderList></OrderList>
              </RequireAuthAdmin>
            </RequireAuth>
          }
        />

        <Route
          path="/admin/order/:id"
          element={
            <RequireAuth>
              <RequireAuthAdmin>
                <ProcessOrder></ProcessOrder>
              </RequireAuthAdmin>
            </RequireAuth>
          }
        />

        <Route
          path="/admin/users"
          element={
            <RequireAuth>
              <RequireAuthAdmin>
                <UsersList></UsersList>
              </RequireAuthAdmin>
            </RequireAuth>
          }
        />

        <Route
          path="/admin/user/:id"
          element={
            <RequireAuth>
              <RequireAuthAdmin>
                <UpdateUser></UpdateUser>
              </RequireAuthAdmin>
            </RequireAuth>
          }
        />

        <Route
          path="/admin/reviews"
          element={
            <RequireAuth>
              <RequireAuthAdmin>
                <ProductReviews></ProductReviews>
              </RequireAuthAdmin>
            </RequireAuth>
          }
        />

        <Route path="*" element={<NotFound></NotFound>} />
      </Routes>
      <Footer></Footer>
    </Router>
  );
}

export default App;
