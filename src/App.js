import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useNavigate,
} from "react-router-dom";
import StockDetails from "./StockDetails";
import PortfolioOverview from "./PortfolioOverview";
import "./App.css";

function App() {
  const [stocks, setStocks] = useState([
    { name: "Hindustan Unilever Ltd", symbol: "HINDUNILVR", price: 2271 },
    { name: "GOLDBEES", symbol: "INFY", price: 1630 },
  ]);

  const navigate = useNavigate();

  const openStockDetails = (stock) => {
    navigate("/details", { state: { stock } });
  };

  return (
    <div className="App">
      <h1>My Portfolio</h1>
      <button className="overview-btn" onClick={() => navigate("/overview")}>
        View Portfolio Overview
      </button>

      {stocks.map((stock, index) => (
        <div key={index} className="stock-card">
          <h3>
            {stock.name} ({stock.symbol}) - ₹{stock.price.toFixed(2)}
          </h3>

          <button onClick={() => openStockDetails(stock)}>View Details</button>
        </div>
      ))}
    </div>
  );
}

export default function AppWrapper() {
  const [stocks] = useState([
    { name: "Hindustan Unilever Ltd", symbol: "HINDUNILVR", price: 2271 },
    { name: "GOLDBEES", symbol: "INFY", price: 1630 },
  ]);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/details" element={<StockDetails />} />
        <Route
          path="/overview"
          element={<PortfolioOverview stocks={stocks} />}
        />
      </Routes>
    </Router>
  );
}
