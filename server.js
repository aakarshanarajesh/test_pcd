import express from "express";
import axios from "axios";

const app = express();
app.use(express.json());

const PORT = 5000;

let orders = [];

/* ============================= */
/* LOAD DATA FROM API */
/* ============================= */

async function loadOrders() {
  try {
    // STEP 1: Get Token
    const tokenResponse = await axios.post(
      "https://t4e-testserver.onrender.com/api/public/token",
      {
        studentId: "E0423031",
        password: "386367",
        set: "setA"
      }
    );

    const token = tokenResponse.data.token;
    const dataUrl = tokenResponse.data.dataUrl;

    console.log("Token:", token);
    console.log("Data URL:", dataUrl);

    // STEP 2: Fetch Data
    const fullUrl = `https://t4e-testserver.onrender.com/api${dataUrl}`;
    const dataResponse = await axios.get(fullUrl, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    console.log("Full Response:", JSON.stringify(dataResponse.data, null, 2));
    orders = dataResponse.data.data.orders;
    console.log("Orders loaded:", orders.length);

  } catch (error) {
    if (error.response) {
      console.log("API Error:", error.response.data);
    } else {
      console.log(error.message);
    }
  }
}

/* ============================= */
/* BASIC ENDPOINTS */
/* ============================= */

app.get("/orders", (req, res) => {
  res.json({
    totalOrders: orders.length,
    orders
  });
});

app.get("/orders/count", (req, res) => {
  res.json({
    totalOrders: orders.length
  });
});

/* ============================= */
/* SEARCH */
/* ============================= */

app.get("/orders/search", (req, res) => {
  const name = req.query.customerName?.toLowerCase();

  const result = orders.filter(o =>
    o.customerName.toLowerCase().includes(name)
  );

  res.json(result);
});

/* ============================= */
/* FILTERING */
/* ============================= */

app.get("/orders/status/:status", (req, res) => {
  const status = req.params.status.toLowerCase();

  const result = orders.filter(o =>
    o.status.toLowerCase() === status
  );

  res.json(result);
});

/* ============================= */
/* ANALYTICS */
/* ============================= */

// Total revenue
app.get("/orders/revenue", (req, res) => {
  const total = orders.reduce((sum, o) => sum + o.totalAmount, 0);

  res.json({ totalRevenue: total });
});

// Average rating
app.get("/orders/average-rating", (req, res) => {
  const avg =
    orders.reduce((sum, o) => sum + o.rating, 0) / orders.length;

  res.json({ averageRating: avg });
});

// Orders per restaurant
app.get("/orders/restaurant/count", (req, res) => {
  const counts = {};

  orders.forEach(o => {
    counts[o.restaurant] = (counts[o.restaurant] || 0) + 1;
  });

  res.json(counts);
});

// Most popular restaurant
app.get("/orders/restaurant/popular", (req, res) => {
  const counts = {};

  orders.forEach(o => {
    counts[o.restaurant] = (counts[o.restaurant] || 0) + 1;
  });

  let max = 0;
  let popular = null;

  for (let r in counts) {
    if (counts[r] > max) {
      max = counts[r];
      popular = r;
    }
  }

  res.json({
    restaurant: popular,
    orders: max
  });
});

/* ============================= */
/* DYNAMIC ROUTE */
/* ============================= */

app.get("/orders/:id", (req, res) => {
  const order = orders.find(o => o.orderId === req.params.id);

  if (!order) {
    return res.status(404).json({ message: "Order not found" });
  }

  res.json(order);
});

/* ============================= */
/* START SERVER */
/* ============================= */

async function start() {
  await loadOrders();
  app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
  });
}

start();