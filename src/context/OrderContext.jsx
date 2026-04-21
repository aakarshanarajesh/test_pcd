import { createContext, useReducer, useEffect } from "react";
import { OrderReducer } from "../reducer/OrderReducer";
import { fetchOrders } from "../api/orderApi";

export const OrderContext = createContext();

export const OrderProvider = ({ children }) => {
  const [state, dispatch] = useReducer(OrderReducer, {
    orders: [],
    filtered: [],
    selectedOrder: null,
    stats: {
      totalOrders: 0,
      deliveredOrders: 0,
      cancelledOrders: 0,
      totalRevenue: 0
    }
  });

  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = async () => {
    try {
      const data = await fetchOrders();
      dispatch({ type: "SET_ORDERS", payload: data });
      dispatch({ type: "COMPUTE_STATS" });
    } catch (error) {
      console.error(error);
    }
  };

  // Q2
  const getOrderById = (id) => {
    dispatch({ type: "GET_ORDER_BY_ID", payload: id });
  };

  // Q3
  const filterByRestaurant = (name) => {
    dispatch({ type: "FILTER_BY_RESTAURANT", payload: name });
  };

  // Q4
  const updateOrderStatus = (orderId, status) => {
    dispatch({
      type: "UPDATE_ORDER_STATUS",
      payload: { orderId, status }
    });
  };

  // Q5
  const computeStats = () => {
    dispatch({ type: "COMPUTE_STATS" });
  };

  return (
    <OrderContext.Provider
      value={{
        state,
        dispatch,
        getOrderById,
        filterByRestaurant,
        updateOrderStatus,
        computeStats
      }}
    >
      {children}
    </OrderContext.Provider>
  );
};