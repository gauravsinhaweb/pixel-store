export const appReducerHandler = (appState, action) => {
  switch (action.type) {
    case "PRODUCT":
      return { ...appState, product: action.payload };
    case "PRODUCT-CART":
      return { ...appState, cart: action.payload };
    case "LOGIN-MODAL":
      return { ...appState, loginModal: action.payload };
    case "SIGNUP-MODAL":
      return { ...appState, signUpModal: action.payload };
    case "ADD-TO-WISHLIST":
      return { ...appState, wishlist: action.payload };
    case "WISHLIST-LENGTH":
      return { ...appState, wishListLength: action.value };
    case "CART-LENGTH":
      return { ...appState, cartLength: action.value };
    case "ADD-TO-CART":
      return {
        ...appState,
        cartItems: action.payload,
        totalPrice: appState.totalPrice + Number(action.payload),
      };
    case "TOKEN":
      return {
        ...appState,
        encodedToken: action.payload,
      };
    case "REMOVE-FROM-CART":
      return {
        ...appState,
        cartItems: appState.cartItems > 0 ? appState.cartItems - 1 : 0,
        totalPrice:
          appState.totalPrice > 0
            ? appState.totalPrice - Number(action.payload)
            : 0,
      };

    default:
      return appState;
  }
};
