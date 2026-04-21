import axios from "axios";

const BASE_URL = "https://t4e-testserver.onrender.com/api";

export const getToken = async (studentId, password, set) => {
  const { data } = await axios.post(`${BASE_URL}/public/token`, {
    studentId,
    password,
    set,
  });

  return data;
};

export const getDataset = async (token, dataUrl) => {
  const fullUrl = `${BASE_URL}${dataUrl}`;
  const { data } = await axios.get(fullUrl, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return data.data.orders;
};
