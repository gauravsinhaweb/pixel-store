import { addToLocalWishlist } from "../../services/localAuth";

export const postWishlist = async (product, encodedToken, appDispatch) => {
  try {
    const wishlist = addToLocalWishlist(product);

    appDispatch({
      type: "WISHLIST-LENGTH",
      value: wishlist.length,
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
