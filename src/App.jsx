import { OrderProvider } from "./context/OrderContext";
import AppRouter from "./routers/AppRouter";
import "./styles/ui.css";

function App() {
  return (
    <OrderProvider>
      <div>
        <header className="app-nav">
          <nav>
            <a href="/" className="nav-link">Home</a>
            <a href="/filter" className="nav-link">Filter</a>
            <a href="/stats" className="nav-link">Stats</a>
            <a href="/orders" className="nav-link">Orders</a>
          </nav>
        </header>

        <AppRouter />
      </div>
    </OrderProvider>
  );
}

export default App;
