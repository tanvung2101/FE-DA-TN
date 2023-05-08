import React, { Fragment, useRef, useState, useEffect } from "react";
import "./LoginSignUp.css";
import Loader from "../layout/Loader/Loader";
import { Link, useNavigate } from "react-router-dom";
import MailOutlineIcon from "@material-ui/icons/MailOutline";
import LockOpenIcon from "@material-ui/icons/LockOpen";
// import FaceIcon from "@material-ui/icons/Face";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, login } from "../../actions/userAction";
import { useAlert } from "react-alert";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import profile from "../../images/Profile.png";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const schema = yup
  .object({
    email: yup.string().required("vui lòng nhập email"),
    password: yup
      .string()
      .min(8, "Mật khẩu phải lớn hơn 8 ký tự")
      .required("Vui lòng nhập password"),
  })
  .required();

const LoginSignUp = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const alert = useAlert();
  const [showHiddenPassword, setShowHiddenPassword] = useState(true);

  const { error, loading, isAuthenticated } = useSelector(
    (state) => state.user
  );

  const loginTab = useRef(null);
  // const registerTab = useRef(null);
  // const switcherTab = useRef(null);

  // const [loginEmail, setLoginEmail] = useState("");
  // const [loginPassword, setLoginPassword] = useState("");

  // const [user, setUser] = useState({
  //   name: "",
  //   email: "",
  //   password: "",
  // });

  // const { name, email, password } = user;
  // let ErrorName = '';
  // let ErrorEmail = '';
  // let ErrorPassword = ''

  // const [avatar, setAvatar] = useState(profile);
  // const [avatarPreview, setAvatarPreview] = useState(profile);

  const loginSubmit = (e) => {
    // e.preventDefault();
    dispatch(login(e.email, e.password));
  };

  // const registerSubmit = (e) => {
  //   e.preventDefault();

  //   const myForm = new FormData();

  //   myForm.set("name", name);
  //   myForm.set("email", email);
  //   myForm.set("password", password);
  //   myForm.set("avatar", avatar);
  //   dispatch(Register(myForm));
  // };

  // const registerDataChange = (e) => {
  //   if (e.target.name === "avatar") {
  //     const reader = new FileReader();

  //     reader.onload = () => {
  //       if (reader.readyState === 2) {
  //         setAvatarPreview(reader.result);
  //         setAvatar(reader.result);
  //       }
  //     };

  //     reader.readAsDataURL(e.target.files[0]);
  //   } else {
  //     setUser({ ...user, [e.target.name]: e.target.value });
  //   }
  // };

  const redirect = "/account";

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
      navigate("/login");
    }

    if (isAuthenticated) {
      navigate(redirect);
    }
  }, [dispatch, error, alert, isAuthenticated, navigate, redirect]);

  // const switchTabs = (e, tab) => {
  //   if (tab === "login") {
  //     switcherTab.current.classList.add("shiftToNeutral");
  //     switcherTab.current.classList.remove("shiftToRight");

  //     registerTab.current.classList.remove("shiftToNeutralForm");
  //     loginTab.current.classList.remove("shiftToLeft");
  //   }
  //   if (tab === "register") {
  //     switcherTab.current.classList.add("shiftToRight");
  //     switcherTab.current.classList.remove("shiftToNeutral");

  //     registerTab.current.classList.add("shiftToNeutralForm");
  //     loginTab.current.classList.add("shiftToLeft");
  //   }
  // };

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <div className="LoginSignUpContainer">
            <div className="LoginSignUpBox">
              <div className="mt-5">
                {/* <div className="login_signUp_toggle"> */}
                <p className="text-center text-lg text-black-400 font-semibold font-sans">
                  LOGIN
                </p>
                {/* </div> */}
              </div>
              <form
                className="loginForm"
                ref={loginTab}
                onSubmit={handleSubmit(loginSubmit)}
                autoComplete="off"
              >
                <div className="loginEmail w-full box-border">
                  <div className="w-full relative">
                    <MailOutlineIcon className="absolute top-1/2 -translate-y-1/2 translate-x-1/2" />
                    <input
                      type="email"
                      placeholder="Email"
                      // required
                      // value={loginEmail}
                      // onChange={(e) => setLoginEmail(e.target.value)}
                      {...register("email")}
                      autoComplete="off"
                      className=""
                    />
                  </div>
                  <span className="text-[12px] font-sans font-medium text-red-400">
                    {errors.email?.message}
                  </span>
                </div>
                <div className="loginPassword w-full box-border">
                  <div className="w-full relative">
                    <LockOpenIcon className="absolute top-1/2 -translate-y-1/2 translate-x-1/2" />
                    <input
                      type={showHiddenPassword ? "password" : "text"}
                      placeholder="Password"
                      // required
                      // value={loginPassword}
                      // onChange={(e) => setLoginPassword(e.target.value)}
                      {...register("password")}
                      autoComplete="off"
                    />
                    <span
                      className="absolute top-1/2 right-0 -translate-y-1/2 -translate-x-[100%]"
                      onClick={() => setShowHiddenPassword(!showHiddenPassword)}
                    >
                      {showHiddenPassword ? (
                        <AiOutlineEyeInvisible />
                      ) : (
                        <AiOutlineEye />
                      )}
                    </span>
                  </div>
                  <span className="text-[12px] font-sans font-medium text-red-400">
                    {errors.password?.message}
                  </span>
                </div>
                <div className="ml-auto flex gap-2 mt-5">
                  <Link to="/password/forgot">Forget Password ?</Link>
                  <Link to="/register">Register</Link>
                </div>
                <button
                  type="submit"
                  className="loginBtn"
                  disabled={isSubmitting ? true : false}
                >
                  Login
                </button>
              </form>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default LoginSignUp;

/*
<form
                className="signUpForm"
                ref={registerTab}
                encType="multipart/form-data"
                onSubmit={registerSubmit}
                autoComplete="off"
              >
                <div className="signUpName mb-2">
                  <FaceIcon />
                  <input
                    type="text"
                    placeholder="Name"
                    // required
                    name="name"
                    value={name}
                    onChange={registerDataChange}
                    autoComplete="off"
                  />
                </div>
                <div className="signUpEmail mb-2">
                  <MailOutlineIcon />
                  <input
                    type="email"
                    placeholder="Email"
                    // required
                    name="email"
                    value={email}
                    onChange={registerDataChange}
                    autoComplete="off"
                  />
                </div>
                <div className="signUpPassword relative mb-2">
                  <LockOpenIcon />
                  <input
                    type={showHiddenPassword ? "password" : "text"}
                    placeholder="Password"
                    // required
                    name="password"
                    value={password}
                    onChange={registerDataChange}
                    autoComplete="off"
                  />
                  <span
                    className="absolute right-0 -translate-x-[100%]"
                    onClick={() => setShowHiddenPassword(!showHiddenPassword)}
                  >
                    {showHiddenPassword ? (
                      <AiOutlineEyeInvisible />
                    ) : (
                      <AiOutlineEye />
                    )}
                  </span>
                </div>

                <div id="registerImage">
                  <img src={avatarPreview} alt="Avatar Preview" />
                  <input
                    type="file"
                    name="avatar"
                    accept="image/*"
                    onChange={registerDataChange}
                    autoComplete="off"
                  />
                </div>
                <input type="submit" value="Register" className="signUpBtn" autoComplete="off"/>
                {/* <button type="submit" className="signUpBtn">
                  Register
                </button> 
                </form>
*/
