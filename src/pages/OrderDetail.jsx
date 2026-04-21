import { useContext } from "react";
import { useParams } from "react-router-dom";
import { OrderContext } from "../context/OrderContext";

const OrderDetail = () => {
  const { id } = useParams(); // Get route parameter (string)
  const { state } = useContext(OrderContext);

  // Validate ID and find order
  // Compare as strings and also try number conversion
  const order = state.orders.find(o => 
    String(o.orderId) === String(id) || 
    String(o.id) === String(id) ||
    o.orderId === parseInt(id) ||
    o.id === parseInt(id)
  );

  if (!order) {
    return <div className="page-container" data-testid="order-not-found">Order not found</div>;
  }

  // Calculate subtotal for each item dynamically
  const calculateSubtotal = (price, quantity) => {
    return (price || 0) * (quantity || 0);
  };

  // Calculate total from items
  const itemsTotal = order.items?.reduce((sum, item) => {
    return sum + calculateSubtotal(item.price, item.quantity);
  }, 0) || 0;

  return (
    <div className="page-container" data-testid="order-detail">
      <h2 className="page-title">Order Details</h2>

      <div className="order-card">
        <div style={{ padding: 12 }}>
          <h3>Order ID: {order.orderId || order.id || "N/A"}</h3>
          <p><strong>Customer:</strong> {order.customerName || "N/A"}</p>
          <p><strong>Restaurant:</strong> {order.restaurant || "N/A"}</p>
          <p><strong>Status:</strong> {order.status || "N/A"}</p>
          <p><strong>Delivery Time:</strong> {order.deliveryTime || "N/A"}</p>
          <p><strong>Rating:</strong> {order.rating || "N/A"}</p>
        </div>
      </div>

      <div style={{ marginTop: 18 }}>
        <h3>Items</h3>
        {order.items && order.items.length > 0 ? (
          <table className="items-table">
            <thead>
              <tr>
                <th>Item Name</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Subtotal</th>
              </tr>
            </thead>
            <tbody>
              {order.items.map((item, index) => (
                <tr key={index} data-testid={`item-${index}`}>
                  <td>{item.name || "N/A"}</td>
                  <td>₹{item.price || 0}</td>
                  <td>{item.quantity || 0}</td>
                  <td data-testid={`subtotal-${index}`}>
                    ₹{calculateSubtotal(item.price, item.quantity)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No items in this order</p>
        )}
      </div>

      <div style={{ marginTop: 12 }}>
        <h3>Total Amount: ₹{order.totalAmount || 0}</h3>
        <p data-testid="items-total">Items Total: ₹{itemsTotal}</p>
      </div>
    </div>
  );
};

export default OrderDetail;
