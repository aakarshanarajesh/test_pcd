import { useContext } from "react";
import { OrderContext } from "../context/OrderContext";
import OrderCard from "../components/OrderCard";

const Orders = () => {
  const { state, dispatch } = useContext(OrderContext);

  // Filter valid orders:
  // - items array is NOT empty
  // - quantity is > 0 for all items
  // - totalAmount is valid (number and > 0)
  const isValidOrder = (order) => {
    const hasItems = order.items && order.items.length > 0;
    const validQuantity = order.items?.every(item => item.quantity > 0);
    const validAmount = order.totalAmount && typeof order.totalAmount === "number" && order.totalAmount > 0;
    return hasItems && validQuantity && validAmount;
  };

  const validOrders = state.orders.filter(isValidOrder).map(order => order);

  // Separate pending and delivered orders
  const pendingOrders = validOrders.filter(o => o.status !== "Delivered");
  const deliveredOrders = validOrders.filter(o => o.status === "Delivered");

  // Handle marking order as delivered
  const handleMarkDelivered = (orderId) => {
    dispatch({
      type: "UPDATE_ORDER_STATUS",
      payload: {
        orderId,
        status: "Delivered"
      }
    });
  };

  return (
    <div className="page-container" data-testid="orders-page">
      <h2 className="page-title">Valid Orders Management</h2>

      <div className="orders-grid">
        {/* Pending Orders Section */}
        <section className="orders-section" data-testid="pending-orders">
          <h3>Pending Orders ({pendingOrders.length})</h3>
          {pendingOrders.length === 0 ? (
            <p className="muted">No pending orders</p>
          ) : (
            <div className="cards-stack">
              {pendingOrders.map(order => (
                <div key={order.orderId} className="card-with-actions" data-testid={`pending-order-${order.orderId}`}>
                  <OrderCard order={order} />
                  <div className="card-actions">
                    <button
                      className="btn btn-primary"
                      onClick={() => handleMarkDelivered(order.orderId)}
                      data-testid={`mark-delivered-${order.orderId}`}
                    >
                      Mark as Delivered
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Delivered Orders Section */}
        <section className="orders-section delivered" data-testid="delivered-orders">
          <h3>Delivered Orders ({deliveredOrders.length})</h3>
          {deliveredOrders.length === 0 ? (
            <p className="muted">No delivered orders</p>
          ) : (
            <div className="cards-stack">
              {deliveredOrders.map(order => (
                <div key={order.orderId} className="card-with-actions delivered-card" data-testid={`delivered-order-${order.orderId}`}>
                  <OrderCard order={order} />
                  <p className="delivered-badge">✓ Delivered</p>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

export default Orders;
