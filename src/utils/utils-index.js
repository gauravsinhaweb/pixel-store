export { getDataFromBackend } from "./api/getDataFromBackend";
export { getSortedProducts } from "./filter-function/Sort";
export { IncludeOutOfStockHandler } from "./filter-function/IncludeOutOfStock";
export { fastDeliveryHandler } from "./filter-function/FastDelivery";
export { priceRangeHandler } from "./filter-function/PriceRange";
export { getProductByOffer } from "./filter-function/offerFilter";
export { getProductByCategory } from "./filter-function/categoryFilter";
export { getSortedRating } from "./filter-function/ratingSort";
export {
  postWishlist,
  isProductInWishlist,
} from "./wishlist/wishlist-utils.js";

// export { filterReducerHandler } from "./reducer/reducer";
