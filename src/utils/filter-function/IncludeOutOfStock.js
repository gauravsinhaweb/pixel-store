export const IncludeOutOfStockHandler = (Product, outOfStock) => {
  return outOfStock
    ? Product
    : Product && Product.filter((item) => item.inStock);
};
