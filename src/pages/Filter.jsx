import { useContext, useState } from "react";
import { OrderContext } from "../context/OrderContext";
import OrderList from "../components/OrderList";

const Filter = () => {
  const { dispatch, state } = useContext(OrderContext);
  const [restaurant, setRestaurant] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const value = e.target.value;
    setRestaurant(value);
    setError("");

    if (value === "") {
      setError("Please enter a restaurant name");
      // Reset to all valid orders
      dispatch({
        type: "FILTER_BY_RESTAURANT",
        payload: ""
      });
    } else {
      // Filter by restaurant (case-sensitive)
      dispatch({
        type: "FILTER_BY_RESTAURANT",
        payload: value
      });
    }
  };

  return (
    <div className="page-container" data-testid="filter-page">
      <h2 className="page-title">Filter Orders by Restaurant</h2>

      <div className="filter-box">
        <input
          className="filter-input"
          data-testid="filter-input"
          placeholder="Enter restaurant name"
          value={restaurant}
          onChange={handleChange}
        />
        {error && <p className="filter-error" data-testid="filter-error">{error}</p>}
      </div>

      <div className="filter-results">
        {state.filtered.length === 0 && restaurant ? (
          <p className="no-results" data-testid="no-results">No results found</p>
        ) : (
          <OrderList />
        )}
      </div>
    </div>
  );
};

export default Filter;
