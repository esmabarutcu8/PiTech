import axios from "axios";

const productApiUrl = ""; //backenddeki api url gelecek
const categoriApiUrl = ""; //backenddeki api url gelecek

export const fetchAllProducts = async () => {
  const response = await axios.get(productApiUrl);
  if (response.data !== null) {
    return response.data;
  } else {
    console.log("Ürün data çekme hatası var"); //backend deki hatayı bas
  }
};
export const fetchAllCategories = async () => {
  const response = await axios.get(categoriApiUrl);
  if (response.data !== null) {
    return response.data;
  } else {
    console.log("Kategori data çekme hatası var"); //backend deki hatayı bas
  }
};

export const addProduct = async (newProduct) => {
  const response = await axios.post(productApiUrl, newProduct);
  if (response !== null) {
    return response;
  } else {
    console.log("Ürün ekleme hatası var"); //backend deki hatayı bas
  }
};
export const updateProduct = async (productId, product) => {
  await axios.put(`${productApiUrl}/${productId}`, product);
};
