import axios from "axios";
import { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useParams,
} from "react-router-dom";
import { offerData } from "../backend/db/products";
import MockAPI from "../backend/MockAPI";
import {
  Hero,
  Product,
  ProductDetail,
  SignUp,
  Login,
  Wishlist,
  Cart,
  Page404,
} from "../pages/pages-index";
import "../App.css";
import { ScrollToTop } from "../utils/utils-index";

const PRODUCT_API = "/api/products";
function RoutePage() {
  let { productOffer, productID } = useParams;
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
            <ScrollToTop />
            <Routes>
              <Route
                exact
                path="/"
                element={<Hero productData={data} offerData={offerData} />}
              />
              <Route
                exact
                path={`/products/:${productOffer}`}
                element={<Product productData={data} />}
              />
              <Route
                exact
                path={`/product/:${productID}`}
                element={<ProductDetail />}
              />
              <Route exact path="/wishlist" element={<Wishlist />} />
              <Route exact path="/cart" element={<Cart />} />
              <Route path="*" element={<Page404 />} />
              <Route exact path="/mock" element={<MockAPI />} />
            </Routes>{" "}
            <Login />
            <SignUp />
          </Router>
        ) : (
          <div className="loader">
            <h1 className="loader-text kodchasan">Loading..</h1>
          </div>
        )}
      </div>
    </>
  );
}

export default RoutePage;
