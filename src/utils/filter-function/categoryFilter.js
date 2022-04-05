export const getProductByCategory = (Product, categories) => {
  if (categories.length > 0) {
    return Product.filter((item) => {
      return categories.some((category) => category === item.category);
    });
  }
  return Product;
};
