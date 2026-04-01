import { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom";
import { offerData, products } from "../data/products";
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

function RoutePage() {
  const [data, setData] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setData(products);
    setLoading(false);
  }, []);

  return (
    <>
      <div className="container">
        {!loading ? (
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
                path="/products/:productOffer"
                element={<Product productData={data} />}
              />
              <Route
                exact
                path="/product/:productID"
                element={<ProductDetail />}
              />
              <Route exact path="/wishlist" element={<Wishlist />} />
              <Route exact path="/cart" element={<Cart data={data} />} />
              <Route path="*" element={<Page404 />} />
            </Routes>
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
