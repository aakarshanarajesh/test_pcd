import { useContext, useEffect } from "react";
import { OrderContext } from "../context/OrderContext";

const Stats = () => {
  const { state } = useContext(OrderContext);

  // Helper to check if order is valid (Q1 rules)
  const isValidOrder = (order) => {
    const hasItems = order.items && order.items.length > 0;
    const validQuantity = order.items?.every(item => item.quantity > 0);
    const validAmount = order.totalAmount && typeof order.totalAmount === "number" && order.totalAmount > 0;
    return hasItems && validQuantity && validAmount;
  };

  // Compute statistics dynamically using .reduce()
  // Only count valid orders, ignore invalid entries and missing status
  const stats = state.orders.reduce(
    (acc, order) => {
      // Only process valid orders
      if (!isValidOrder(order)) {
        return acc;
      }

      // Skip if status is missing
      if (!order.status) {
        return acc;
      }

      // Count total valid orders
      acc.totalOrders += 1;

      // Count by status
      if (order.status === "Delivered") {
        acc.deliveredOrders += 1;
      } else if (order.status === "Cancelled") {
        acc.cancelledOrders += 1;
      }

      return acc;
    },
    {
      totalOrders: 0,
      deliveredOrders: 0,
      cancelledOrders: 0
    }
  );

  // Set global window.appState (for testing/debugging)
  useEffect(() => {
    window.appState = stats;
  }, [stats]);

  return (
    <div className="page-container stats-page" data-testid="stats-page">
      <h1 className="page-title">Order Analytics</h1>

      <div className="stats-grid">
        <div className="stat-card" data-testid="total-orders">
          <div className="stat-label">Total Orders</div>
          <div className="stat-value">{stats.totalOrders}</div>
        </div>

        <div className="stat-card" data-testid="delivered-orders">
          <div className="stat-label">Delivered</div>
          <div className="stat-value delivered">{stats.deliveredOrders}</div>
        </div>

        <div className="stat-card" data-testid="cancelled-orders">
          <div className="stat-label">Cancelled</div>
          <div className="stat-value cancelled">{stats.cancelledOrders}</div>
        </div>
      </div>

      <div className="stats-summary">
        <p>Pending Orders: {stats.totalOrders - stats.deliveredOrders - stats.cancelledOrders}</p>
        <p>Delivery Rate: {stats.totalOrders > 0 ? ((stats.deliveredOrders / stats.totalOrders) * 100).toFixed(2) : 0}%</p>
        <p>Cancellation Rate: {stats.totalOrders > 0 ? ((stats.cancelledOrders / stats.totalOrders) * 100).toFixed(2) : 0}%</p>
      </div>
    </div>
  );
};

export default Stats;
