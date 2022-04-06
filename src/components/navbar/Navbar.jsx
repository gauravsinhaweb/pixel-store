import React from "react";
import { BsFillHandbagFill } from "react-icons/bs";
import { FiLogIn } from "react-icons/fi";
import { FaHeart } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";

import "./Navbar.css";
import { useAppContext } from "../../context/AppContext";
export function Navbar() {
  const Navigate = useNavigate();
  const { appState, appDispatch } = useAppContext();
  const logoutHandler = () => {
    localStorage.removeItem("token");
    appDispatch({ type: "TOKEN", payload: null });
    Navigate("/");
  };
  const loginModalHandler = () => {
    appDispatch({ type: "LOGIN-MODAL", payload: true });
  };
  const isTokenInLocalStorage = localStorage.getItem("token");
  return (
    <>
      <nav className="h3">
        <div className="wrapper_nav h3 flex">
          <Link to="/">
            <div className="nav_brand_text">
              pixel.<span className="store">store</span>
            </div>
          </Link>
          <div>
            <ul className="flex p category_list">
              <li>games</li>
              <li>hardware</li>
              <li>service</li>
              <li>shop</li>
            </ul>
          </div>
          <div>
            <input
              className="basic_inp inp_sm"
              type="text"
              placeholder="search"
            />
          </div>

          <div className="">
            <ul className="flex nav_icons">
              {isTokenInLocalStorage ? (
                <li>
                  <button
                    id="nav-modal"
                    onClick={logoutHandler}
                    className="btn btn-primary btn-login"
                  >
                    logout
                  </button>
                </li>
              ) : (
                <li className="wrapper_badge" onClick={loginModalHandler}>
                  <FiLogIn />
                </li>
              )}
              <Link to="/wishlist">
                <li className="wrapper_badge">
                  <FaHeart />
                  <span className="badge flex-center">
                    {appState.wishListLength < 10
                      ? appState.wishListLength
                      : "9+"}
                  </span>
                </li>
              </Link>
              <Link to="/cart">
                <li className="wrapper_badge">
                  <BsFillHandbagFill />
                  <span className="badge flex-center">
                    {appState.cartLength < 10 ? appState.cartLength : "9+"}
                  </span>
                </li>
              </Link>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
