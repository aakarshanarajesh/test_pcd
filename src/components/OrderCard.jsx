import { Link } from "react-router-dom";

const OrderCard = ({ order }) => {
  const status = order.status || "Pending";
  const statusClass =
    status === "Delivered" ? "status-delivered" : status === "Cancelled" ? "status-cancelled" : "status-pending";

  return (
    <Link to={`/orders/${order.orderId}`} className="order-link">
      <div className="order-card" data-testid="order-item">
        <div className="order-card-header">
          <h3 className="order-customer">{order.customerName || "Unknown"}</h3>
          <span className={`order-status ${statusClass}`}>{status}</span>
        </div>
        <p className="order-restaurant">{order.restaurant || "-"}</p>
        <div className="order-meta">
          <div className="order-total">Total: <strong>₹{order.totalAmount || 0}</strong></div>
          <div className="order-delivery">{order.deliveryTime || "N/A"}</div>
        </div>
      </div>
    </Link>
  );
};

export default OrderCard;
