import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Link as LinkToID } from "react-scroll";
import { Footer, Navbar } from "../../components/components-index.js";
import "./hero.css";
import { HeroDisplay } from "./HeroDisplay.jsx";

export const Hero = (props) => {
  const { productData, offerData } = props;
  const [slider, setSlider] = useState("slide1");

  useEffect(() => {
    const imageArray = ["slide1", "slide2", "slide3"];
    const getRandomImg = setInterval(() => {
      const random = Math.floor(Math.random() * imageArray.length);
      setSlider(imageArray[random]);
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
            <img src={`/assets/${slider}.webp`} alt="slider1" loading="lazy" />
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
            <img src="/assets/curve1.webp" alt="curve" loading="lazy" />
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
                  .map((product) => {
                    return <HeroDisplay key={product._id} product={product} />;
                  })}
              </div>
            </div>
          ))}
        </div>
        <div className=" banner_offer">
          <img src="/assets/banner.png" alt="banner" loading="lazy" />
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
                .map((product) => {
                  return <HeroDisplay key={product._id} product={product} />;
                })}
            </div>
          </div>
        ))}
      </main>
      <Footer />
    </>
  );
};
