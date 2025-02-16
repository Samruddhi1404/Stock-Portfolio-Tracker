import React, { useState } from "react";

const AddStock = ({ addStock }) => {
  const [stock, setStock] = useState({ name: "", symbol: "", price: "" });

  const handleChange = (e) => {
    setStock({ ...stock, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (stock.name && stock.symbol && stock.price) {
      addStock(stock);
      setStock({ name: "", symbol: "", price: "" });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="name"
        placeholder="Stock Name"
        value={stock.name}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="symbol"
        placeholder="Symbol"
        value={stock.symbol}
        onChange={handleChange}
        required
      />
      <input
        type="number"
        name="price"
        placeholder="Price"
        value={stock.price}
        onChange={handleChange}
        required
      />
      <button type="submit">Add Stock</button>
    </form>
  );
};

export default AddStock;
