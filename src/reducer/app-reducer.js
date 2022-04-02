export const appReducerHandler = (appState, action) => {
  switch (action.type) {
    case "LOGIN-MODAL":
      return { ...appState, loginModal: action.payload };
    case "SIGNUP-MODAL":
      return { ...appState, signUpModal: action.payload };
    default:
      return appState;
  }
};
