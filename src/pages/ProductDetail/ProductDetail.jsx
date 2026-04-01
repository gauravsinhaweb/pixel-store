import React from "react";
import { Link } from "react-router-dom";
import { Navbar } from "../../components/components-index";
import { useAppContext } from "../../context/AppContext";
import { isProductInWishlist, postWishlist } from "../../utils/utils-index";
import "./ProductDetail.css";
import StarRatings from "react-star-ratings";
import { addToLocalCart } from "../../services/localAuth";

export const ProductDetail = () => {
  const { appState, appDispatch } = useAppContext();
  const product = appState && appState.product;
  const encodedToken = localStorage.getItem("token");

  const addToWishlist = async (product) => {
    postWishlist(product, encodedToken, appDispatch);
    appDispatch({ type: "ADD-TO-WISHLIST", payload: product });
  };
  const addToCartHandler = async (product) => {
    if (isProductInWishlist(product, appState.cart)) {
      return "";
    }

    try {
      const cart = addToLocalCart(product);
      appDispatch({ type: "PRODUCT-CART", payload: cart });
      isProductInWishlist(product, cart);
      appDispatch({ type: "CART-LENGTH", value: cart.length });
    } catch (error) {
      if (error.response.status === 500) {
        alert("Please login to add to cart");
        appDispatch({ type: "LOGIN-MODAL", payload: true });
      }
    }
  };
  return (
    <>
      <Navbar />
      <div className="flex wrapper_product_list">
        <div>
          <div>
            <img src={product.image} className="product_img" alt="product_1" />
          </div>
        </div>
        <div className="product_detail_content">
          <h1 className="h1 kodchasan">{product.name}</h1>{" "}
          <StarRatings
            rating={product.ratings}
            starDimension="2.5rem"
            starSpacing="0px"
            starRatedColor="orange"
          />
          <p className="p-lg product_Description work-sans">
            {product.description}
          </p>
          <div className="h3 text_cl product_detail_content">{`Brand:  ${product.brand}`}</div>
          <div className="h3 text_cl product_detail_content">{`Price:   $ ${product.price}`}</div>
          <div className="h3 text_cl product_detail_content">{`material:   ${product.material}`}</div>{" "}
          <div className="flex btn_wrapper btn_wrapper_hr ">
            {" "}
            <button
              className="btn btn-cta"
              onClick={() => addToCartHandler(product)}
            >
              {isProductInWishlist(product, appState.cart) ? (
                <>
                  <Link to="/cart">
                    <span>go to cart</span>
                  </Link>
                </>
              ) : (
                <>
                  <span>Add to cart</span>
                </>
              )}
            </button>
            <button
              className="btn out-cta"
              onClick={() => addToWishlist(product)}
            >
              wishlist
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
