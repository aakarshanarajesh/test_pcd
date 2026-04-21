import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Filter from "../pages/Filter";
import Stats from "../pages/Stats";
import Orders from "../pages/Orders";
import OrderDetail from "../pages/OrderDetail";

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/orders" element={<Orders />} />
      <Route path="/orders/:id" element={<OrderDetail />} />
      <Route path="/filter" element={<Filter />} />
      <Route path="/stats" element={<Stats />} />
    </Routes>
  );
};

export default AppRouter;
