import axios from "axios";

const BASE_URL = "http://localhost:8000";

export const postAPI = async (url, data) => {
  const res = await axios.post(`${BASE_URL}/api/${url}`, data);
  return res;
};

export const getAPI = async (url) => {
  console.log(`${BASE_URL}/api/${url}`);
  const res = await axios.get(`${BASE_URL}/api/${url}`);
  return res;
};
