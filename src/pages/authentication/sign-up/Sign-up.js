import React, { useState } from "react";
import "./Sign-up.css";
import { BsXLg } from "react-icons/bs";
import { useAppContext } from "../../../context/AppContext";
import axios from "axios";

export const SignUp = () => {
  let signUpDisplay;
  const { appState, appDispatch } = useAppContext();
  const [signupData, setSignupData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  if (appState.signUpModal === true) {
    signUpDisplay = "block";
    document.body.style.overflow = "hidden";
  } else if (appState.signUpModal === false) {
    signUpDisplay = "none";
  }

  const signupHandler = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`/api/auth/signup`, signupData);
      // saving the encodedToken in the localStorage
      localStorage.setItem("token", response.data.encodedToken);
      console.log(response);
      appDispatch({ type: "SIGNUP-MODAL", payload: false });
    } catch (error) {
      alert("invalid credentials");
      console.log(error);
    }
  };
  return (
    <>
      <header
        id="modal-signup"
        className="modal"
        style={{ display: `${signUpDisplay}` }}
      >
        <div className="card modal_box flex">
          <div className="modal_img">
            <div className="login_banner flex-center">
              <img src="https://picsum.photos/300/600" alt="signup-img" />
              <div className="nav_brand_text h3">
                Pixel.<span className="store">Store</span>
              </div>
            </div>
          </div>
          <div className="modal_content">
            <div className="flex wrapper_head">
              <h2 className="h2">Signup</h2>
              <div>
                <button
                  className="btn_modal"
                  onClick={() =>
                    appDispatch({ type: "SIGNUP-MODAL", payload: false })
                  }
                >
                  <BsXLg />
                </button>
              </div>
            </div>
            <form className="flex modal_form" onSubmit={signupHandler}>
              <label className="p text_cl" htmlFor="firstName">
                first name
              </label>
              <input
                type="text"
                id="firstName"
                className="basic_inp inp_md"
                onChange={(e) => {
                  setSignupData({
                    ...signupData,
                    firstName: e.target.value,
                  });
                }}
                placeholder="John"
              />{" "}
              <label className="p text_cl" htmlFor="lastName">
                last name
              </label>
              <input
                type="text"
                id="lastName"
                className="basic_inp inp_md"
                onChange={(e) => {
                  setSignupData({
                    ...signupData,
                    lastName: e.target.value,
                  });
                }}
                placeholder="Doe"
              />
              <label className="p text_cl" htmlFor="email-signup">
                Email
              </label>
              <input
                type="email"
                id="email-signup"
                className="basic_inp inp_md"
                onChange={(e) => {
                  setSignupData({
                    ...signupData,
                    email: e.target.value,
                  });
                }}
                placeholder="johndoe@email.com"
              />
              <label className="p text_cl" htmlFor="password-signup">
                password
              </label>
              <input
                type="password"
                id="password-signup"
                className="basic_inp inp_md"
                onChange={(e) => {
                  setSignupData({
                    ...signupData,
                    password: e.target.value,
                  });
                }}
                placeholder="password"
              />
              <div className="flex wrapper_modal_btn">
                <button className="btn btn-cta text_cl btn_login">
                  Sign up
                </button>
              </div>
            </form>
            <div className="flex-center">
              <span className="p">Already have an account?</span>
              <button
                id="open-login"
                className="btn-link text_cl p"
                onClick={() =>
                  appDispatch({ type: "SIGNUP-MODAL", payload: false }) +
                  appDispatch({ type: "LOGIN-MODAL", payload: true })
                }
              >
                login
              </button>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};
