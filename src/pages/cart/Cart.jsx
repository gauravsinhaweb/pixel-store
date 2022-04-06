import axios from "axios";
import React, { useEffect, useState } from "react";
import StarRatings from "react-star-ratings";
import { Navbar } from "../../components/components-index";
import { useAppContext } from "../../context/AppContext";
import { Link } from "react-router-dom";
import "./Cart.css";

export const Cart = () => {
  const encodedToken = localStorage.getItem("token");
  axios.defaults.headers.common["authorization"] = encodedToken;

  const { appState, appDispatch } = useAppContext();
  const [cartItemValue, setCartItemValue] = useState(0);
  const productCart = appState.cart;
  useEffect(() => {
    (async () => {
      setCartItemValue(appState.cartItems);
      try {
        const response = await axios.get("/api/user/cart");
        response &&
          appDispatch({ type: "PRODUCT-CART", payload: response.data.cart });
      } catch (error) {
        if (error.response.status === 500) {
          alert("you need to login");
          appDispatch({ type: "LOGIN-MODAL", payload: true });
        } else if (error.response.status === 409) {
          alert("already in wishlist");
        } else {
          console.log(error);
        }
      }
    })();
  }, [appDispatch, appState.cartItems]);

  const priceHandler = {
    price:
      productCart &&
      productCart.reduce(
        (acc, item) => acc + Number(item.price) + appState.totalPrice,
        0
      ),
    discount:
      productCart &&
      productCart.reduce(
        (acc, item) =>
          acc +
          (Number(item.price) - (50 / 100) * Number(item.price)) +
          appState.totalPrice,
        0
      ),
    delivery:
      productCart &&
      productCart.reduce((acc, item) => acc + Number(item.price), 0) +
        appState.totalPrice * 0.05,
  };
  const isTokenInLocalStorage = localStorage.getItem("token");
  return (
    <>
      <Navbar />
      <main>
        <div className="wrapper_cart flex">
          {isTokenInLocalStorage && productCart && productCart.length !== 0 ? (
            <>
              {" "}
              <div className="wrapper_items">
                ( <div className="text_cl h3 text-head">Shopping Cart</div>
                {productCart &&
                  productCart.map(
                    ({
                      _id,
                      name,
                      image,
                      price,
                      productName,
                      ratings,
                      brand,
                    }) => (
                      <div className="card_hr  flex" key={_id}>
                        <div className="img_cart">
                          <img src={image} alt={productName} />
                        </div>
                        <div className="card_hr_content ">
                          <h2 title={name} className="card_name_product">
                            {name}
                          </h2>
                          <StarRatings
                            rating={ratings}
                            starDimension="2rem"
                            starSpacing="0px"
                            starRatedColor="orange"
                          />
                          <p className="p-lg text_cl">
                            <strong>Brand</strong> : {brand}
                          </p>

                          <div className="card_hr_price text_cl">
                            <div className="p-lg">
                              m.r.p.:{" "}
                              <span className="text_line_th">{` $${
                                Number(price) + Number(200)
                              }`}</span>
                            </div>
                            <div className="text_uc p-lg">50% off</div>
                            <div className="p-lg">
                              deal of the day:
                              <span className="h2 dod_price">
                                {" "}
                                {` $${parseFloat(appState.totalPrice)}`}
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="flex-center btn_wrapper_hr">
                          <button
                            onClick={() =>
                              appDispatch({
                                type: "REMOVE-FROM-CART",
                                payload: price,
                              })
                            }
                            className="btn out-cta btn_count"
                          >
                            -
                          </button>
                          <label htmlFor="cartItem"></label>
                          <input
                            id="cartItem"
                            value={cartItemValue}
                            onChange={(e) => setCartItemValue(e.target.value)}
                            className="p-lg"
                            type="number"
                          />
                          <button
                            onClick={() =>
                              appDispatch({
                                type: "ADD-TO-CART",
                                payload: price,
                              })
                            }
                            className="btn btn-cta btn_count"
                          >
                            +
                          </button>
                        </div>
                      </div>
                    )
                  )}
              </div>
              )
              <div className="card card-content">
                <div className="flex modal_title">
                  <div className="title h3 text_uc">Price Details</div>
                </div>
                <hr />
                <div className="wrapper_price flex text_cl">
                  <div className="flex p-lg">
                    <span>price {`( ${appState.cartLength || 0} items )`}</span>
                    <span>${priceHandler.price}</span>
                  </div>
                  <div className="flex p-lg">
                    <span>discount (50%)</span>
                    <span>-${priceHandler.discount}</span>
                  </div>
                  <div className="flex p-lg">
                    <span>delivery charges (5%)</span>
                    <span>${priceHandler.delivery.toFixed(2)}</span>
                  </div>
                  <hr />
                  <div className="title flex text_uc h3">
                    <span>Total amount</span>
                    <span className="dod_price">
                      $
                      {priceHandler.price +
                        priceHandler.delivery +
                        priceHandler.discount}
                    </span>
                  </div>
                </div>

                <div className="footer btn_wrapper_cwd flex-center">
                  <button className="btn btn-cta btn_order">place order</button>
                </div>
              </div>
            </>
          ) : (
            <div className="flex-center wrapper_empty_cart empty_cart">
              {" "}
              <h1>No Items Added </h1>
              <Link to="/">
                <button className="btn btn-cta">Go for shopping</button>
              </Link>
            </div>
          )}
        </div>
      </main>
    </>
  );
};
