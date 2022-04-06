import React, { useEffect, useState } from "react";
import { Navbar } from "../../components/components-index";
import "./Wishlist.css";
import axios from "axios";
import StarRatings from "react-star-ratings";
import { Link } from "react-router-dom";
import { useAppContext } from "../../context/AppContext";

export const Wishlist = () => {
  const encodedToken = localStorage.getItem("token");
  axios.defaults.headers.common["authorization"] = encodedToken;
  const [productWishlist, setProductWishlist] = useState();
  const { appDispatch } = useAppContext();

  useEffect(() => {
    (async () => {
      try {
        const response = await axios.get("/api/user/wishlist");
        setProductWishlist(response.data.wishlist);
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
  }, [appDispatch]);

  const isTokenInLocalStorage = localStorage.getItem("token");
  return (
    <>
      <Navbar />
      <main>
        {isTokenInLocalStorage &&
        productWishlist &&
        productWishlist.length !== 0 ? (
          <>
            {" "}
            <div className="text_cl h3 text-head text-center">
              Shopping Cart
            </div>
            <div className="wrapper_card_wl flex-center">
              <div className="card_item">
                {productWishlist &&
                  productWishlist.map(
                    ({
                      name,
                      _id,
                      image,
                      price,
                      productName,
                      ratings,
                      brand,
                    }) => (
                      <div className="card_hr card_wishlist" key={_id}>
                        <div className="card_content flex">
                          <div className="img_product">
                            <img src={image} alt={productName} />
                          </div>
                          <div className="card_hr_content">
                            <h2 title={name} className="card_name_product">
                              {name}
                            </h2>
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
                              <div className="star">
                                <StarRatings
                                  rating={ratings}
                                  starDimension="2rem"
                                  starSpacing="0px"
                                  starRatedColor="orange"
                                />
                              </div>
                              <div className="p-lg">
                                deal of the day:
                                <span className="h2 dod_price">
                                  {` $${parseFloat(price)}`}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div>
                          <div className="flex btn_wrapper btn_wrapper_hr">
                            <button className="btn btn-cta btn_add_to_cart">
                              move to cart
                            </button>
                          </div>
                        </div>
                      </div>
                    )
                  )}
              </div>
            </div>
          </>
        ) : (
          <div className="flex-center wrapper_empty_cart empty_wishlist">
            {" "}
            <h1>No Items Added </h1>
            <Link to="/">
              <button className="btn btn-cta">Go for shopping</button>
            </Link>
          </div>
        )}
      </main>
    </>
  );
};
