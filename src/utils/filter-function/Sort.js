export const getSortedProducts = (Product, sortByPrice) => {
  if (sortByPrice === "LOW-HIGH")
    return [...Product].sort((item1, item2) => item1.price - item2.price);
  if (sortByPrice === "HIGH-LOW")
    return [...Product].sort((item1, item2) => item2.price - item1.price);

  return Product;
};
