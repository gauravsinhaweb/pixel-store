import React, { createContext, useContext, useReducer } from "react";
import { appReducerHandler } from "../reducer/app-reducer";

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [appState, appDispatch] = useReducer(appReducerHandler, {
    loginModal: false,
    signUpModal: false,
  });

  const value = { appState, appDispatch };
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = () => useContext(AppContext);
