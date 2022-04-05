export const getProductByOffer = (Product, dealOfDay, bonanza) => {
  const selectedOffer = window.location.pathname.split("/")[2];

  if (dealOfDay && bonanza) {
    return Product.filter(
      (item) =>
        item.offer.toString() === "Deal of the day" ||
        item.offer.toString() === "70% bonanza"
    );
  } else if (dealOfDay) {
    return Product.filter(
      (item) => item.offer.toString() === "Deal of the day"
    );
  } else if (bonanza) {
    return Product.filter((item) => item.offer.toString() === "70% bonanza");
  } else {
    return Product.filter(
      (item) =>
        item.offer
          .toString()
          .replace(/ /g, "")
          .replace(/\d+% ?/g, "")
          .toLowerCase() === selectedOffer
    );
  }
};
