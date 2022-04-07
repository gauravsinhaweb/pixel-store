import React from "react";
import { useNavigate } from "react-router-dom";
import StarRatings from "react-star-ratings";
import { useAppContext } from "../../context/AppContext";

export const HeroDisplay = (props) => {
  const {
    product: { _id, name, image, price, productName, ratings },
    product,
  } = props;
  const { appDispatch } = useAppContext();
  const Navigate = useNavigate();
  return (
    <>
      <div
        onClick={() =>
          appDispatch({ type: "PRODUCT", payload: product }) +
          Navigate(`/product/${_id}`)
        }
      >
        {" "}
        <div className="card_hr flex-center card_hero">
          <div className="card_hr_img card_img_hero">
            <img src={image} alt={productName} loading="lazy" />
          </div>
          <div className="card_hr_content">
            <p title={name} className="h3 card_name_hero">
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
                <span className="text_line_th">{`$${
                  Number(price) + Number(200)
                }`}</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
