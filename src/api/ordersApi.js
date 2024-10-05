import axios from "axios";

const orderApiUrl = ""; //backende göre

export const fetchOrders = async () => {
  try {
    const response = await axios.get(orderApiUrl);
    return response.data;
  } catch (error) {
    return error;
  }
};

export const CreateOrder = async (order) => {
  try {
    const response = await axios.post(orderApiUrl, order);
    return response.data;
  } catch (error) {
    return error;
  }
};
