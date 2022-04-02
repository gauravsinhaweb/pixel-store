import axios from "axios";
import { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { offerData } from "../backend/db/products";
import MockAPI from "../backend/MockAPI";
import { Hero } from "../pages/pages-index";

const PRODUCT_API = "/api/products";
function RoutePage() {
  const [data, setData] = useState();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios(PRODUCT_API);
      setData(res.data.products);
      setLoading(true);
    };
    fetchData();
  }, [loading]);

  return (
    <>
      <div className="container">
        {loading ? (
          <Router>
            <Routes>
              <Route
                exact
                path="/"
                element={<Hero productData={data} offerData={offerData} />}
              />

              <Route exact path="/mock" element={<MockAPI />} />
            </Routes>{" "}
          </Router>
        ) : (
          <p>loading</p>
        )}
      </div>
    </>
  );
}

export default RoutePage;
