import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import { useNavigate } from "react-router-dom";

const PortfolioOverview = ({ stocks }) => {
  const navigate = useNavigate();

  // Generate Stock Data with Day 30 Prices
  const generateStockData = (baseValue, days) => {
    let currentValue = baseValue;
    return Array.from({ length: days }, () => {
      const change = Math.random() * 200 - 100;
      currentValue += change;
      return currentValue;
    });
  };

  // Update Stocks with Day 30 Prices
  const updatedStocks = stocks.map((stock) => {
    const stockData = generateStockData(stock.price, 30);
    const day30Price = stockData[29];
    return { ...stock, currentPrice: day30Price };
  });

  const initialTotalValue = stocks.reduce((acc, stock) => acc + stock.price, 0);
  const currentTotalValue = updatedStocks.reduce(
    (acc, stock) => acc + stock.currentPrice,
    0
  );
  const profitOrLoss = currentTotalValue - initialTotalValue;
  const isProfit = profitOrLoss >= 0;

  // Generate Portfolio Data
  const generateData = (baseValue, fluctuation, days) => {
    let currentValue = baseValue;
    const portfolioData = Array.from({ length: days - 1 }, (_, i) => {
      const change = (Math.random() - 0.5) * fluctuation;
      currentValue += change;
      return {
        date: `Day ${i + 1}`,
        portfolio: currentValue,
      };
    });

    // Set Day 30 portfolio value to actual currentTotalValue
    portfolioData.push({
      date: "Day 30",
      portfolio: currentTotalValue,
    });

    return portfolioData;
  };

  const data = generateData(initialTotalValue, 3000, 30);

  return (
    <div>
      <h1>Portfolio Overview</h1>
      <h2
        style={{
          color: isProfit ? "green" : "red",
        }}
      >
        Total Portfolio Value: ₹{currentTotalValue.toFixed(2)} (
        {isProfit ? "▲ Profit" : "▼ Loss"} ₹{Math.abs(profitOrLoss).toFixed(2)})
      </h2>

      {/* Line Chart Without Index */}
      <LineChart width={800} height={400} data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis
          tickFormatter={(value) => `₹${value.toFixed(2)}`}
          width={100} // Ensuring visibility of Y-axis labels
        />
        <Tooltip formatter={(value) => [`₹${value.toFixed(2)}`, "Value"]} />
        <Legend />
        <Line
          type="monotone"
          dataKey="portfolio"
          stroke="#4CAF50"
          name="Portfolio"
        />
      </LineChart>

      {/* Stock Holdings Table */}
      <h2>My Holdings</h2>
      <table border="1" cellPadding="10">
        <thead>
          <tr>
            <th>Name</th>
            <th>Symbol</th>
            <th>Purchase Price</th>
            <th>Current Price </th>
            <th>Details</th>
          </tr>
        </thead>
        <tbody>
          {updatedStocks.map((stock) => (
            <tr key={stock.symbol}>
              <td>{stock.name}</td>
              <td>{stock.symbol}</td>
              <td>₹{stock.price.toFixed(2)}</td>
              <td
                style={{
                  color: stock.currentPrice >= stock.price ? "green" : "red",
                }}
              >
                ₹{stock.currentPrice.toFixed(2)}
              </td>
              <td>
                <button
                  onClick={() => navigate("/details", { state: { stock } })}
                >
                  View Details
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Back Button */}
      <button className="back-button" onClick={() => navigate("/")}>
        Back to Portfolio
      </button>
    </div>
  );
};

export default PortfolioOverview;
