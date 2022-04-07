import React, { createContext, useContext, useReducer } from "react";
import { appReducerHandler } from "../reducer/app-reducer";

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [appState, appDispatch] = useReducer(appReducerHandler, {
    product: [],
    loginModal: false,
    signUpModal: false,
    wishlist: [],
    cart: [],
    cartItems: 1,
    totalPrice: 0,
    cartLength: 0,
    wishListLength: 0,
    encodedToken: localStorage.getItem("token"),
  });

  const value = { appState, appDispatch };
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = () => useContext(AppContext);
