export const getSortedRating = (Products, rating) => {
  return Products.filter((item) => item.ratings >= rating);
};
