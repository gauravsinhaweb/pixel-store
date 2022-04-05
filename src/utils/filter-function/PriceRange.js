export const priceRangeHandler = (Products, priceRange) => {
  return Products.filter((item) => item.price <= priceRange);
};
