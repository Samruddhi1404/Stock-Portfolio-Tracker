import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";
import { useLocation, useNavigate } from "react-router-dom";

const StockDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { stock } = location.state;

  // Generate Realistic Stock Data (Gradual Changes)
  const generateStockData = (baseValue, days) => {
    let currentValue = baseValue;
    return Array.from({ length: days }, (_, i) => {
      const change = Math.random() * 200 - 100; // Random fluctuation between -100 to +100
      currentValue += change;
      return {
        date: `Day ${i + 1}`,
        value: currentValue,
      };
    });
  };

  const data = generateStockData(stock.price, 30);

  // Get Day 30 Price as the Current Price
  const latestValue = data[data.length - 1].value;
  const isPositiveChange = latestValue >= stock.price;

  return (
    <div style={{ padding: "20px" }}>
      <h1>
        {stock.name} - {stock.symbol}
      </h1>
      {/* Display Day 30 Price as the Current Price */}
      <h2>Current Price: ₹{latestValue.toFixed(2)}</h2>
      <h3 style={{ color: isPositiveChange ? "green" : "red" }}>
        {isPositiveChange ? "▲ Profit" : "▼ Loss"}
      </h3>

      {/* Line Chart for Stock Value */}
      <LineChart width={800} height={400} data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis tickFormatter={(value) => `₹${value.toFixed(2)}`} />
        <Tooltip
          formatter={(value) => [`₹${value.toFixed(2)}`, "Stock Value"]}
        />
        <Line
          type="monotone"
          dataKey="value"
          stroke={isPositiveChange ? "#4CAF50" : "#FF0000"}
          name="Stock Value"
          dot={false}
        />
      </LineChart>

      {/* Back to Portfolio Button */}
      <button
        onClick={() => navigate("/")}
        style={{
          marginTop: "20px",
          backgroundColor: "#4CAF50",
          color: "white",
          border: "none",
          padding: "10px 20px",
          fontSize: "16px",
          cursor: "pointer",
          borderRadius: "8px",
        }}
      >
        Back to Portfolio
      </button>
    </div>
  );
};

export default StockDetails;
