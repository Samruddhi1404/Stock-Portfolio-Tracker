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

const PortfolioOverview = ({ portfolio }) => {
  const navigate = useNavigate();

  // Generate Portfolio and Index data (gradual changes for smoother graph)
  const generateData = (baseValue, fluctuation, days) => {
    let currentValue = baseValue;
    return Array.from({ length: days }, (_, i) => {
      const change = (Math.random() - 0.5) * fluctuation;
      currentValue += change;
      return {
        date: `Day ${i + 1}`,
        portfolio: currentValue,
        index: baseValue - 5000 + Math.sin(i / 5) * 3000,
      };
    });
  };

  const data = generateData(100000, 3000, 30);

  // Calculate total portfolio value
  const totalValue = portfolio.reduce(
    (acc, stock) => acc + parseFloat(stock.price),
    0
  );

  return (
    <div>
      <h1>Portfolio Overview</h1>
      <h2>Total Portfolio Value: ${totalValue.toFixed(2)}</h2>

      {/* Line Chart */}
      <LineChart width={800} height={400} data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line
          type="monotone"
          dataKey="portfolio"
          stroke="#4CAF50"
          name="Portfolio"
        />
        <Line type="monotone" dataKey="index" stroke="#2196F3" name="Index" />
      </LineChart>

      {/* List of Stocks */}
      <h2>My Holdings</h2>
      <table border="1" cellPadding="10">
        <thead>
          <tr>
            <th>Name</th>
            <th>Symbol</th>
            <th>Price</th>
            <th>Change</th>
            <th>Details</th>
          </tr>
        </thead>
        <tbody>
          {portfolio.map((stock) => {
            const change = (Math.random() - 0.5) * 10; // Simulating change %
            const isPositive = change >= 0;
            return (
              <tr key={stock.symbol}>
                <td>{stock.name}</td>
                <td>{stock.symbol}</td>
                <td>${stock.price}</td>
                <td style={{ color: isPositive ? "green" : "red" }}>
                  {isPositive
                    ? `+${change.toFixed(2)}%`
                    : `${change.toFixed(2)}%`}
                </td>
                <td>
                  <button
                    onClick={() => navigate("/stock", { state: { stock } })}
                  >
                    View Details
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default PortfolioOverview;
