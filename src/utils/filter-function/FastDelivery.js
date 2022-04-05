export const fastDeliveryHandler = (Product, outOfStock, fastDelivery) => {
  return fastDelivery ? Product.filter((item) => item.fastDelivery) : Product;
};
