import React, { useState } from "react";

const Portfolio = ({ portfolio, removeStock }) => {
  const [showIndicators, setShowIndicators] = useState(false);
  const [days, setDays] = useState(5); // Default moving average period

  // Function to generate random price data for the last 'n' days
  const generateRandomPrices = () => {
    return Array.from({ length: days }, () => (Math.random() * 200).toFixed(2));
  };

  // Function to calculate moving average
  const calculateMovingAverage = (prices) => {
    const total = prices.reduce((acc, price) => acc + parseFloat(price), 0);
    return (total / prices.length).toFixed(2);
  };

  return (
    <div>
      <h2>My Portfolio</h2>
      <button onClick={() => setShowIndicators(!showIndicators)}>
        {showIndicators ? "Hide Indicators" : "Show Indicators"}
      </button>

      <ul>
        {portfolio.map((stock, index) => {
          const prices = generateRandomPrices();
          const movingAverage = calculateMovingAverage(prices);
          const lastPrice = prices[prices.length - 1];

          return (
            <li key={index}>
              <strong>
                {stock.name} ({stock.symbol})
              </strong>{" "}
              - ${lastPrice}
              <button onClick={() => removeStock(stock.symbol)}>Remove</button>
              {showIndicators && (
                <div>
                  <p>
                    Last {days}-day Moving Avg: ${movingAverage}
                  </p>
                  <p>
                    Strategy: {lastPrice > movingAverage ? "📈 Buy" : "📉 Sell"}
                  </p>
                </div>
              )}
            </li>
          );
        })}
      </ul>

      {showIndicators && (
        <div>
          <label>Moving Average Days: </label>
          <input
            type="number"
            value={days}
            onChange={(e) => setDays(parseInt(e.target.value))}
            min="2"
          />
        </div>
      )}
    </div>
  );
};

export default Portfolio;
