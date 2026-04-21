import { useContext } from "react";
import { OrderContext } from "../context/OrderContext";
import OrderCard from "./OrderCard";

const OrderList = () => {
  const { state } = useContext(OrderContext);

  return (
    <div className="cards-stack">
      {state.filtered.map(order => (
        <OrderCard key={order.orderId} order={order} />
      ))}
    </div>
  );
};

export default OrderList;
