import axios from "axios";

export const postWishlist = async (product, encodedToken, appDispatch) => {
  try {
    const response = await axios.post(
      "/api/user/wishlist",
      { product: product },
      {
        headers: {
          authorization: encodedToken,
        },
      }
    );

    appDispatch({
      type: "WISHLIST-LENGTH",
      value: response.data.wishlist.length,
    });
  } catch (error) {
    if (error.response.status === 409) {
      alert(error.response.data.errors);
    } else {
      alert("you need to sign in");
      appDispatch({ type: "LOGIN-MODAL", payload: true });
    }

    console.log(error);
  }
};

export const isProductInWishlist = (product, filterProduct) => {
  return filterProduct.some((item) => item._id === product._id);
};
