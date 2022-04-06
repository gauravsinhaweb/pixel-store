import React from "react";
import { Navbar } from "../../components/components-index";
import { useFilterContext } from "../../context/FilterContext";
import {
  fastDeliveryHandler,
  getProductByOffer,
  getSortedProducts,
  IncludeOutOfStockHandler,
  priceRangeHandler,
  getProductByCategory,
  getSortedRating,
} from "../../utils/utils-index";
import "./product.css";
import { ProductDisplay } from "./ProductDisplay";
import { Sidebar } from "./Sidebar";

export const Product = (props) => {
  const { productData } = props;
  const { filter, dispatch } = useFilterContext();

  const sortedProduct = getSortedProducts(productData, filter.sortByPrice);
  const outOfStock = IncludeOutOfStockHandler(sortedProduct, filter.outOfStock);
  const fastDelivery = fastDeliveryHandler(
    outOfStock,
    filter.outOfStock,
    filter.fastDelivery
  );
  const priceRange = priceRangeHandler(fastDelivery, filter.priceRange);
  const offerFilter = getProductByOffer(
    priceRange,
    filter.offerDealOfDay,
    filter.offerBonanza
  );
  const categoryFilter = getProductByCategory(offerFilter, filter.category);
  const ratingFilter = getSortedRating(categoryFilter, filter.rating);
  const filterProduct = ratingFilter;

  return (
    <>
      <Navbar />
      <div className="wrapper_product">
        {/* sidebar  */}
        <Sidebar filter={filter} dispatch={dispatch} />
        {/* main */}
        <main>
          <div className="wrapper_card wrapper_card_product flex">
            {filterProduct.map((product) => {
              return (
                <ProductDisplay
                  key={product._id}
                  product={product}
                  filterProduct={filterProduct}
                />
              );
            })}
          </div>
        </main>
      </div>
    </>
  );
};
