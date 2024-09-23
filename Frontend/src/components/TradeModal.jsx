import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import axiosInstance from "../Utils/AxiosInstance";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Register the chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

function TradeModal({ coin, onClose }) {
  const [quantity, setQuantity] = useState(1);
  const [chartData, setChartData] = useState(null);
  const [currentPrice, setCurrentPrice] = useState(coin.current_price);
  const [error, setError] = useState(null);
  const [transactions, setTransactions] = useState([]);

  const handleBuy = async () => {
    if (!quantity || quantity * currentPrice < 100) {
      setError("Please select a larger quantity!");
      return;
    }

    try {
      const response = await axiosInstance.post("/transaction/buy", {
        type: "buy",
        coinId: coin.name.toLowerCase(),
        quantityOfCoins: quantity,
        priceAtTransaction: currentPrice,
      });

      if (response.data && response.data.successful) {
        setError("");
        onClose();
        return;
      }
    } catch (error) {
      setError("Error while buying: " + error);
    }
  };

  const handleSell = async () => {
    if (!quantity || quantity * currentPrice < 100) {
      setError("Minimum trade should be at least ₹100!");
      return;
    }

    try {
      const response = await axiosInstance.post("/transaction/sell", {
        coinId: coin.name.toLowerCase(),
        type: "sell",
        quantityOfCoins: quantity,
        priceAtTransaction: currentPrice,
      });

      if (response.data && response.data.successful) {
        setError("");
        onClose();
        return;
      }
      setError("Selling error: " + response.data.message);
    } catch (error) {
      setError("Error while selling: " + error);
    }
  };

  const fetchTransactions = async () => {
    try {
      const response = await axiosInstance.get(
        "/transaction/showtransactions",
        {
          params: {
            coinId: coin.name.toLowerCase(),
          },
        }
      );

      if (response.data && response.data.successful) {
        setTransactions(response.data.content);
        console.log("Fetched transactions successfully");
      } else {
        setError(response.data.message);
      }
    } catch (error) {
      setError("Error fetching transactions: " + error.message);
    }
  };

  useEffect(() => {
    const fetchChartData = async () => {
      try {
        const response = await fetch(
          `https://api.coingecko.com/api/v3/coins/${coin.id}/market_chart?vs_currency=usd&days=7`
        );
        const data = await response.json();

        const prices = data.prices.map((price) => price[1]);
        const timestamps = data.prices.map((price) =>
          new Date(price[0]).toLocaleDateString()
        );

        setChartData({
          labels: timestamps,
          datasets: [
            {
              label: `${coin.name} Price (INR)`,
              data: prices,
              borderColor: "rgba(75, 192, 192, 1)",
              backgroundColor: "rgba(75, 192, 192, 0.3)",
              fill: true,
            },
          ],
        });
      } catch (error) {
        console.error("Error fetching chart data:", error);
      }
    };

    fetchChartData();
  }, [coin]);

  useEffect(() => {
    fetchTransactions();
  }, [coin]);

  const handleQuantityChange = (e) => {
    setQuantity(e.target.value);
  };

  const totalPrice = (coin.current_price * quantity).toFixed(2);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center">
      <div className="bg-white bg-opacity-10 backdrop-blur-lg rounded-2xl shadow-lg w-96 p-6 relative border border-white border-opacity-20 transition-transform transform hover:scale-105">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-white">{coin.name}</h2>
          <button onClick={onClose} className="text-red-500 font-bold">
            X
          </button>
        </div>

        <div className="my-4 flex items-center">
          <img src={coin.image} alt={coin.name} className="w-10 h-10 mr-2" />
          <p className="text-lg text-white">₹{coin.current_price.toLocaleString()}</p>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-200">Quantity</label>
          <input
            type="number"
            className="border border-white border-opacity-30 rounded-lg w-full px-3 py-2 bg-transparent text-white transition duration-300 focus:outline-none focus:ring focus:ring-blue-500"
            value={quantity}
            onChange={handleQuantityChange}
            min="1"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-200">Total Price (INR)</label>
          <input
            type="text"
            className="border border-white border-opacity-30 rounded-lg w-full px-3 py-2 bg-transparent text-white"
            value={totalPrice}
            readOnly
          />
        </div>

        <div className="mb-4">
          {chartData ? (
            <Line data={chartData} options={{ responsive: true, maintainAspectRatio: false }} />
          ) : (
            <p className="text-white">Loading chart...</p>
          )}
        </div>

        <div className="mb-4 max-h-64 overflow-auto border-gray-300 p-4 bg-gray-700 bg-opacity-50 rounded-lg">
          <h3 className="text-lg font-bold text-white">Transaction History</h3>
          {transactions.length > 0 ? (
            <ul className="text-sm text-gray-300">
              {transactions.map((transaction, index) => (
                <li key={index} className="mb-2">
                  <strong>{transaction.type.toUpperCase()}:</strong>{" "}
                  {transaction.quantity} coins at ₹{transaction.priceAtTransaction} ( Total: ₹{transaction.paidAmount})
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-300">No transactions found for this coin.</p>
          )}
        </div>

        <div className="flex justify-between">
          <button
            className="bg-green-500 text-white py-2 px-4 rounded-lg transition-transform transform hover:scale-105 shadow-md hover:shadow-lg"
            onClick={handleBuy}
          >
            Buy
          </button>
          <button
            className="bg-red-500 text-white py-2 px-4 rounded-lg transition-transform transform hover:scale-105 shadow-md hover:shadow-lg"
            onClick={handleSell}
          >
            Sell
          </button>
        </div>
      </div>
    </div>
  );
}

export default TradeModal;
