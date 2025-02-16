import React, { useState, useEffect } from "react";
import Portfolio from "./components/PortFolio";
import AddStock from "./components/AddStock";
import "./App.css";

const App = () => {
  const [portfolio, setPortfolio] = useState([]);
  const [user, setUser] = useState(null);
  const [username, setUsername] = useState("");

  // Load user & portfolio from localStorage on mount
  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    const savedPortfolio = JSON.parse(localStorage.getItem("portfolio")) || [];
    if (savedUser) setUser(savedUser);
    setPortfolio(savedPortfolio);
  }, []);

  // Save portfolio & user to localStorage when changed
  useEffect(() => {
    if (user) {
      localStorage.setItem("user", user);
      localStorage.setItem("portfolio", JSON.stringify(portfolio));
    }
  }, [user, portfolio]);

  // Handle login
  const handleLogin = () => {
    if (username.trim() !== "") {
      setUser(username);
      setUsername("");
    }
  };

  // Handle logout
  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("user");
    localStorage.removeItem("portfolio");
  };

  // Add stock to portfolio
  const addStock = (stock) => {
    setPortfolio([...portfolio, stock]);
  };

  // Remove stock from portfolio
  const removeStock = (symbol) => {
    setPortfolio(portfolio.filter((stock) => stock.symbol !== symbol));
  };

  return (
    <div className="App">
      <header className="App-header">
        {!user ? (
          <div>
            <h2>Login</h2>
            <input
              type="text"
              placeholder="Enter username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <button onClick={handleLogin}>Login</button>
          </div>
        ) : (
          <>
            <h1>Welcome, {user}!</h1>
            <button onClick={handleLogout}>Logout</button>
            <AddStock addStock={addStock} />
            <Portfolio portfolio={portfolio} removeStock={removeStock} />
          </>
        )}
      </header>
    </div>
  );
};

export default App;
