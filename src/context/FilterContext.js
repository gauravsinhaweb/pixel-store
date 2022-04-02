import React, { createContext, useContext, useReducer } from "react";
import { filterReducerHandler } from "../reducer/filter-reducer";

const FilterContext = createContext();

export const FilterProvider = ({ children }) => {
  const [filter, dispatch] = useReducer(filterReducerHandler, {
    category: [],
    rating: 0,
    offerDealOfDay: false,
    offerBonanza: false,
    sortByPrice: "",
    outOfStock: false,
    fastDelivery: false,
    priceRange: 1000,
    clearAll: true,
    cartItems: 0,
    totalPrice: 0,
  });

  const value = { filter, dispatch };
  return (
    <FilterContext.Provider value={value}>{children}</FilterContext.Provider>
  );
};

export const useFilterContext = () => useContext(FilterContext);
