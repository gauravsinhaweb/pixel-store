import axios from "axios";
import React, { useState } from "react";
import { BsFillHandbagFill } from "react-icons/bs";
import { FaRunning } from "react-icons/fa";
import { RiHeartFill } from "react-icons/ri";
import StarRatings from "react-star-ratings";
import { useAppContext } from "../../context/AppContext";
import { postWishlist } from "../../utils/utils-index";
import { isProductInWishlist } from "../../utils/wishlist/wishlist-utils";
import { Link, useNavigate } from "react-router-dom";

export const ProductDisplay = (props) => {
  const {
    product: { _id, name, image, price, productName, ratings },
    product,
  } = props;
  const { appState, appDispatch } = useAppContext();
  const [isHeartClicked, setIsHeartClicked] = useState("emptyWishlist");
  const encodedToken = localStorage.getItem("token");
  const Navigate = useNavigate();

  const addToWishlist = async (product) => {
    setIsHeartClicked("filledWishlist");
    postWishlist(product, encodedToken, appDispatch);
    appDispatch({ type: "ADD-TO-WISHLIST", payload: product });
  };

  const addToCartHandler = async (product) => {
    if (isProductInWishlist(product, appState.cart)) {
      return "";
    }

    try {
      const response = await axios.post(
        "/api/user/cart",
        { product: product },
        {
          headers: {
            authorization: encodedToken,
          },
        }
      );
      appDispatch({ type: "PRODUCT-CART", payload: response.data.cart });
      isProductInWishlist(product, response.data.cart);
      appDispatch({ type: "CART-LENGTH", value: response.data.cart.length });
      // saving the encodedToken in the localStorage
    } catch (error) {
      if (error.response.status === 500) {
        alert("Please login to add to cart");
        appDispatch({ type: "LOGIN-MODAL", payload: true });
      }
      console.log(error);
    }
  };
  return (
    <>
      <div>
        <div
          className="card_hr flex-center card_product"
          onClick={() =>
            appDispatch({ type: "PRODUCT", payload: product }) +
            Navigate(`/product/${_id}`)
          }
        >
          <div className="card_hr_img flex-center">
            <img src={image} className="card_img_product" alt={productName} />
          </div>
          <div
            className={`wishlist_icon ${isHeartClicked}`}
            onClick={() => addToWishlist(product)}
          >
            <RiHeartFill />
          </div>
          <div className="card_hr_content">
            <p title={name} className="h3 card_name_product">
              {name}
            </p>
            <StarRatings
              rating={ratings}
              starDimension="2rem"
              starSpacing="0px"
              starRatedColor="orange"
            />
            <div className="card_hr_price text_cl">
              <p className="p-lg">
                deal of the day:
                <span className="h2 dod_price">{` $${parseFloat(price)}`}</span>
              </p>
              <p className="p-lg">
                m.r.p.:
                <span className="text_line_th h4">{` $${
                  Number(price) + Number(200)
                }`}</span>
              </p>
            </div>
          </div>
          <div className="flex btn_wrapper_hr">
            <button
              className="btn btn-cta btn_add_to_cart"
              onClick={() => addToCartHandler(product)}
            >
              {isProductInWishlist(product, appState.cart) ? (
                <>
                  {" "}
                  <span>
                    {" "}
                    <FaRunning />
                  </span>{" "}
                  <Link to="/cart">
                    <span>go to cart</span>
                  </Link>
                </>
              ) : (
                <>
                  <span>
                    <BsFillHandbagFill />
                  </span>{" "}
                  <span>Add to cart</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
