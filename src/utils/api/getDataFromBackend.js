import { products } from "../../data/products";
export const getDataFromBackend = async () => {
  try {
    console.log(products);
  } catch (error) {
    console.log(error);
  }
};
