import React, { Fragment, useRef, useState, useEffect } from "react";
import "./LoginSignUp.css";
import Loader from "../layout/Loader/Loader";
import { Link, useNavigate } from "react-router-dom";
import MailOutlineIcon from "@material-ui/icons/MailOutline";
import LockOpenIcon from "@material-ui/icons/LockOpen";
import FaceIcon from "@material-ui/icons/Face";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, Register } from "../../actions/userAction";
import { useAlert } from "react-alert";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import profile from "../../images/Profile.png";

const Registerd = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const alert = useAlert();
  const [showHiddenPassword, setShowHiddenPassword] = useState(true);

  const { error, loading, isAuthenticated } = useSelector(
    (state) => state.user
  );

  const registerTab = useRef(null);

  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });

  let errorName = "";
  let errorEmail = "";
  let errorPassword = "";

  const { name, email, password } = user;

  const [avatar, setAvatar] = useState(profile);
  const [avatarPreview, setAvatarPreview] = useState(profile);

  const registerSubmit = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("name", name);
    myForm.set("email", email);
    myForm.set("password", password);
    myForm.set("avatar", avatar);
    dispatch(Register(myForm));
  };

  const registerDataChange = (e) => {
    if (e.target.name === "avatar") {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setAvatarPreview(reader.result);
          setAvatar(reader.result);
        }
      };

      reader.readAsDataURL(e.target.files[0]);
    } else {
      setUser({ ...user, [e.target.name]: e.target.value });
    }
  };

  const redirect = "/account";

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
      navigate("/register");
    }

    if (isAuthenticated) {
      navigate(redirect);
    }
  }, [dispatch, error, alert, isAuthenticated, navigate, redirect]);

  function validationName() {
    if (name === "") {
      errorName = "vui lòng nhập tên của bạn";
    } else if (name.length > 30) {
      errorName = "Name cannot exceed 30 characters";
    } else if (name.length < 4) {
      errorName = "Name should have more than 4 characters";
    }
  }

  function validationEmail() {
    if (email.length === 0) {
      errorEmail = "Vui lòng nhập email";
    } else if (
      !email.match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      )
    ) {
      errorEmail = "vui lòng nhập email đúng với cú pháp";
    }
  }

  function validationPassword() {
    if (password.length === 0) {
      errorPassword = "Vui lòng nhập mật khẩu";
    } else if (password.length < 8) {
      errorPassword = "Password should be greater than 8 characters";
    }
  }

  validationName();
  validationEmail();
  validationPassword();

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <div className="LoginSignUpContainer">
            <div className="LoginSignUpBox">
              <div>
                <div className="login_signUp_toggle mb-2">
                  <p className="text-black-500">REGISTER</p>
                </div>
              </div>
              <form
                className="signUpForm"
                ref={registerTab}
                encType="multipart/form-data"
                onSubmit={registerSubmit}
                autoComplete="off"
              >
                <div className="signUpName flex flex-col items-start  mb-2">
                  <div className="">
                    <FaceIcon className="-translate-y-1/2" />
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
                  <span className="mt-2 text-[12px] font-sans font-medium text-red-400">
                    {errorName}
                  </span>
                </div>
                <div className="signUpEmail flex flex-col items-start mb-2">
                  <div>
                    <MailOutlineIcon className="-translate-y-1/2" />
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
                  <span className="mt-2 text-[12px] font-sans font-medium text-red-400">
                    {errorEmail}
                  </span>
                </div>
                <div className="signUpPassword relative mb-2">
                  <div>
                    <LockOpenIcon className="-translate-y-1/2" />
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
                  <span className="mt-2 text-[12px] font-sans font-medium text-red-400">
                    {errorPassword}
                  </span>
                </div>

                <div className="w-full flex gap-2" id="registerImage">
                  <img
                    src={avatarPreview}
                    alt="Avatar Preview"
                    className="object-cover"
                  />
                  <input
                    type="file"
                    name="avatar"
                    accept="image/*"
                    onChange={registerDataChange}
                    autoComplete="off"
                    className="border border-slate-500"
                  />
                </div>
                <input
                  type="submit"
                  value="Register"
                  className="signUpBtn"
                  autoComplete="off"
                />
              </form>
              <div className="text-sm text-center font-sans mt-5">Already have an account? <Link to='/login'>Log In</Link></div>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default Registerd;
