// Q1
const isValidOrder = (order) => {
  const hasName = order.customerName && order.customerName.trim() !== "";
  const hasItems = order.items && order.items.length > 0;
  const validQuantity = order.items?.every(item => item.quantity > 0);
  const validAmount =
    typeof order.totalAmount === "number" && order.totalAmount > 0;

  return hasName && hasItems && validQuantity && validAmount;
};

export const OrderReducer = (state, action) => {
  switch (action.type) {

    case "SET_ORDERS":
      return {
        ...state,
        orders: action.payload,
        filtered: action.payload
      };

    case "FILTER_ORDERS":
      if (!action.payload) {
        return {
          ...state,
          filtered: state.orders
        };
      }

      return {
        ...state,
        filtered: state.orders.filter(o =>
          o.customerName?.toLowerCase().includes(action.payload.toLowerCase())
        )
      };

    // Q3
    case "FILTER_BY_RESTAURANT":
      const validOrders = state.orders.filter(isValidOrder);

      if (!action.payload) {
        return {
          ...state,
          filtered: validOrders
        };
      }

      return {
        ...state,
        filtered: validOrders.filter(o =>
          o.restaurant?.toLowerCase().includes(action.payload.toLowerCase())
        )
      };

    // Q4
    case "UPDATE_ORDER_STATUS":
      const { orderId, status } = action.payload;

      const orderToUpdate = state.orders.find(
        o =>
          String(o.orderId) === String(orderId) ||
          String(o.id) === String(orderId)
      );

      if (
        !orderToUpdate ||
        !isValidOrder(orderToUpdate) ||
        orderToUpdate.status === "Delivered"
      ) {
        return state;
      }

      return {
        ...state,
        orders: state.orders.map(o =>
          String(o.orderId) === String(orderId) ||
          String(o.id) === String(orderId)
            ? { ...o, status }
            : o
        ),
        filtered: state.filtered.map(o =>
          String(o.orderId) === String(orderId) ||
          String(o.id) === String(orderId)
            ? { ...o, status }
            : o
        )
      };

    // Q2
    case "GET_ORDER_BY_ID":
      const foundOrder = state.orders.find(
        o =>
          String(o.orderId) === String(action.payload) ||
          String(o.id) === String(action.payload)
      );

      return {
        ...state,
        selectedOrder:
          foundOrder && isValidOrder(foundOrder) ? foundOrder : null
      };

    // Q5
    case "COMPUTE_STATS":
      const stats = state.orders.reduce(
        (acc, order) => {
          if (!isValidOrder(order)) return acc;
          if (!order.status) return acc;

          acc.totalOrders += 1;

          if (order.status === "Delivered") {
            acc.deliveredOrders += 1;
          } else if (order.status === "Cancelled") {
            acc.cancelledOrders += 1;
          }

          acc.totalRevenue += order.totalAmount;

          return acc;
        },
        {
          totalOrders: 0,
          deliveredOrders: 0,
          cancelledOrders: 0,
          totalRevenue: 0
        }
      );

      return {
        ...state,
        stats
      };

    default:
      return state;
  }
};