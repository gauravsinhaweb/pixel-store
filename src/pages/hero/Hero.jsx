import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Link as LinkToID } from "react-scroll";
import StarRatings from "react-star-ratings";
import { Footer, Navbar } from "../../components/components-index.js";
import "./Hero.css";

export const Hero = (props) => {
  const { productData, offerData } = props;
  const [slider, setSlider] = useState("slide1");

  useEffect(() => {
    const imgArr = ["slide1", "slide2", "slide3"];
    const getRandomImg = setInterval(() => {
      const random = Math.floor(Math.random() * imgArr.length);
      setSlider(imgArr[random]);
    }, [5000]);
    return () => {
      clearInterval(getRandomImg);
    };
  }, []);

  return (
    <>
      <Navbar />
      <main>
        <div className="wrapper_main">
          <div className="banner flex">
            <img src={`/assets/${slider}.webp`} alt="slider1" />
            <div className="text_cl overlay_text kodchasan">
              <div>360°</div>
              <div>re-imaging the world</div>
              <div>
                3d virtual and augmented reality panoramas
                <br /> to demonstrate
              </div>
              <LinkToID to="head" offset={-50}>
                <button className="btn btn-cta">shop now</button>
              </LinkToID>
            </div>
          </div>
          <div className="banner img_curve">
            <img className="" src="/assets/curve1.webp" alt="curve" />
          </div>
          <div className="text-center kodchasan hero_title text_cl">
            <div className="h4">High-Quality VR </div>
            <h2 className="h2">
              <b>The Real World Immersion</b>
            </h2>
          </div>
          {offerData.map((offer) => (
            <div key={offer} id="head">
              <div className="flex wrapper_head montserrat">
                <h2 className="head_text">{offer}</h2>
                <Link
                  to={`/products/${offer
                    .replace(/ /g, "")
                    .replace(/\d+% ?/g, "")
                    .toLowerCase()}`}
                >
                  <button className="btn-link view_all p">view all</button>
                </Link>
              </div>
              <div className="wrapper_card flex">
                {productData
                  .filter((item) => item.offer.toString() === offer)
                  .slice(0, 5)
                  .map(
                    ({
                      _id,
                      name,
                      image,
                      price,
                      productName,
                      ratings,
                      inStock,
                      material,
                      fastDelivery,
                      offer,
                    }) => {
                      return (
                        <div key={_id}>
                          <Link to={`/product/${_id}`}>
                            {" "}
                            <div className="card_hr flex-center card_hero">
                              <div className="card_hr_img card_img_hero">
                                <img src={image} alt={productName} />
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
                                    <span className="h2 dod_price">
                                      {` $${parseFloat(price)}`}
                                    </span>
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
                          </Link>
                        </div>
                      );
                    }
                  )}
              </div>
            </div>
          ))}
        </div>
        <div className=" banner_offer">
          <img src="/assets/banner.png" alt="banner" />
        </div>
        <div className="text-center kodchasan hero_title text_cl">
          <div className="h4">our best products </div>
          <h2 className="h2">
            <b>made only for you</b>
          </h2>
        </div>
        {offerData.map((offer) => (
          <div key={offer} id="head">
            <div className="flex wrapper_head montserrat">
              <h2 className="head_text">{offer}</h2>
              <Link
                to={`/product/${offer
                  .replace(/ /g, "")
                  .replace(/\d+% ?/g, "")
                  .toLowerCase()}`}
              >
                <button className="btn-link view_all p">view all</button>
              </Link>
            </div>
            <div className="wrapper_card flex">
              {productData
                .filter((item) => item.offer.toString() === offer)
                .slice(0, 5)
                .map(
                  ({
                    _id,
                    name,
                    image,
                    price,
                    productName,
                    ratings,
                    inStock,
                    material,
                    fastDelivery,
                    offer,
                  }) => (
                    <div key={_id}>
                      <div className="card_hr flex-center card_hero">
                        <div className="card_hr_img card_img_hero">
                          <img src={image} alt={productName} />
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
                              <span className="h2 dod_price">
                                {` $${parseFloat(price)}`}
                              </span>
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
                  )
                )}
            </div>
          </div>
        ))}
      </main>
      <Footer />
    </>
  );
};
