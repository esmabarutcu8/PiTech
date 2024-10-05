const basketApiUrl = ""; //backenddeki api url gelecek

export const fetchBasketProducts = async () => {
  const response = await axios.get(basketApiUrl);
  if (response.data !== null) {
    return response.data;
  } else {
    console.log("sepetteki ürün hatası var"); //backend deki hatayı bas
  }
};
