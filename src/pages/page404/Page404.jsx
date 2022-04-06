import React from "react";
import { Link } from "react-router-dom";
import { Navbar } from "../../components/components-index";

export const Page404 = () => {
  return (
    <>
      <Navbar />
      <main className="">
        <div className="text_cl h3 text-head text-center">Oop! Error 404</div>
        <br />
        <br />
        <br />
        <br />
        <Link to="/">
          <div className="flex-center">
            <button className="btn btn-cta">Back to home</button>
          </div>
        </Link>
      </main>
    </>
  );
};
