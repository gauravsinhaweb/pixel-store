import axios from "axios";
export const getDataFromBackend = async () => {
  try {
    const response = await axios.get("/api/products");
    console.log(response.data.products);
  } catch (error) {
    console.log(error);
  }
};
