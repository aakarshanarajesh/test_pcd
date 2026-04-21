import axios from "axios";

export const fetchOrders = async () => {
  try {
    const tokenRes = await axios.post(
      "https://t4e-testserver.onrender.com/api/public/token",
      {
        studentId: "E0423031",
        password: "386367",
        set: "setA"
      }
    );

    const token = tokenRes.data.token;
    const dataUrl = tokenRes.data.dataUrl;

    const fullUrl = `https://t4e-testserver.onrender.com/api${dataUrl}`;

    const res = await axios.get(fullUrl, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    return res.data.data.orders || [];
  } catch (error) {
    console.error("Error fetching orders:", error);
    return [];
  }
};
