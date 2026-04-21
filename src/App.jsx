import { OrderProvider } from "./context/OrderContext";
import AppRouter from "./routers/AppRouter";
import NavBar from "./components/NavBar";
import { BrowserRouter } from "react-router-dom";
import "./styles/ui.css";

function App() {
  return (
    <OrderProvider>
      <BrowserRouter>
        <div>
          <NavBar />
          <AppRouter />
        </div>
      </BrowserRouter>
    </OrderProvider>
  );
}

export default App;
