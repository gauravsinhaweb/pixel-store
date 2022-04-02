export const filterReducerHandler = (filter, action) => {
  switch (action.type) {
    case "RATING":
      return { ...filter, rating: action.payload };
    case "CATEGORY":
      return { ...filter, category: action.payload };
    case "OFFER-DEAL-OF-DAY":
      return { ...filter, offerDealOfDay: action.payload };
    case "OFFER-BONANZA":
      return { ...filter, offerBonanza: action.payload };
    case "LOW-HIGH":
      return { ...filter, sortByPrice: action.type };
    case "HIGH-LOW":
      return { ...filter, sortByPrice: action.type };
    case "OUT-OF-STOCK":
      return { ...filter, outOfStock: action.payload };
    case "FAST-DELIVERY":
      return { ...filter, fastDelivery: action.payload };
    case "PRICE-RANGE":
      return { ...filter, priceRange: parseInt(action.value, 10) };
    case "CLEAR-ALL":
      return { ...filter, clearAll: action.payload === false };
    case "ADD_TO_CART":
      return {
        ...filter,
        cartItems: filter.cartItems + 1,
        totalPrice: filter.totalPrice + Number(action.payload),
      };
    case "REMOVE_FROM_CART":
      return {
        ...filter,
        cartItems: filter.cartItems - 1,
        totalPrice: filter.totalPrice - Number(action.payload),
      };

    default:
      return filter;
  }
};
