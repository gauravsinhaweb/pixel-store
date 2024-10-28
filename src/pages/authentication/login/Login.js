import React, { useState } from "react";
import "./Login.css";
import { BsXLg } from "react-icons/bs";
import { useAppContext } from "../../../context/AppContext";
import axios from "axios";

export const Login = () => {
  let loginDisplay;
  const { appState, appDispatch } = useAppContext();
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  if (appState.loginModal === true) {
    document.body.style.overflow = "hidden";
    loginDisplay = "block";
  } else if (appState.loginModal === false) {
    document.body.style.overflow = "visible";
    loginDisplay = "none";
  }

  const loginHandler = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`/api/auth/login`, loginData);
      if (response.status === 200) {
        localStorage.setItem("token", response.data.encodedToken);
        appDispatch({ type: "LOGIN-MODAL", payload: false });
      } else {
        alert("Invalid Credentials");
      }

      // saving the encodedToken in the localStorage
    } catch (error) {
      alert("Invalid Credentials");
      console.log(error);
    }
  };

  const loginAsGuestHandler = (e) => {
    e.preventDefault();

    setLoginData({
      email: "johndoe@gmail.com",
      password: "cooljohndoe",
    });
  };
  return (
    <>
      <header
        id="modal"
        className="modal"
        style={{ display: `${loginDisplay}` }}
      >
        <div className="card modal_box flex">
          <div className="modal_img">
            <div className="login_banner flex-center">
              <img src="/assets/download.png" alt="login-img" />
              <div className="nav_brand_text h3">
                Pixel.<span className="store">Store</span>
              </div>
            </div>
          </div>
          <div className="modal_content kodchasan">
            <div className="flex wrapper_head">
              <h2 className="h2">Login</h2>
              <div>
                <button
                  className="btn_modal"
                  onClick={() =>
                    appDispatch({ type: "LOGIN-MODAL", payload: false })
                  }
                >
                  <BsXLg />
                </button>
              </div>
            </div>
            <form className="flex modal_form">
              <label className="p text_cl" htmlFor="email">
                Email
              </label>
              <input
                type="email"
                id="email"
                value={loginData.email}
                onChange={(e) => {
                  setLoginData({
                    ...loginData,
                    email: e.target.value,
                  });
                }}
                className="basic_inp inp_md"
                placeholder="johndoe@email.com"
              />

              <label className="p text_cl" htmlFor="password">
                password
              </label>
              <input
                type="password"
                id="password"
                value={loginData.password}
                className="basic_inp inp_md"
                onChange={(e) => {
                  setLoginData({
                    ...loginData,
                    password: e.target.value,
                  });
                }}
                placeholder="Password"
              />
              <div className="flex wrapper_modal_btn">
                <button
                  onClick={loginHandler}
                  className="btn btn-cta text_cl btn_login"
                >
                  login
                </button>
              </div>
              <div className="flex wrapper_modal_btn">
                <button
                  onClick={(e) => loginAsGuestHandler(e)}
                  className="btn out-cta text_cl btn_login"
                >
                  login as a guest
                </button>
              </div>
            </form>
            <div className="flex-center">
              <span className="p">Need an account?</span>
              <button
                id="open-signup"
                className="btn-link text_cl p kodchasan"
                onClick={() =>
                  appDispatch({ type: "SIGNUP-MODAL", payload: true }) +
                  appDispatch({ type: "LOGIN-MODAL", payload: false })
                }
              >
                sign up
              </button>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};
