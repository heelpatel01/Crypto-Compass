import React from "react";
import Header from "../components/Header";
import { AuthProvider } from "../contexts/AuthProvider";

function Portfolio() {
  // Dummy data for investable and current holdings
  const investableHoldings = [
    { coinName: "Bitcoin", price: "₹30,00,000" },
    { coinName: "Ethereum", price: "₹1,90,000" },
    { coinName: "Cardano", price: "₹25" },
  ];

  const currentHoldings = [
    { coinName: "Bitcoin", quantity: 0.5, currPrice: "₹30,00,000" },
    { coinName: "Ethereum", quantity: 2, currPrice: "₹1,90,000" },
  ];

  // Dummy balance data
  const investableBalance = "₹50,00,000"; // Balance that can be invested
  const investedBalance = "₹7,00,000"; // Currently invested balance
  const totalBalance = "₹57,00,000"; // Total value (investable + invested)

  return (
    <div className="min-h-screen bg-gray-900 text-gray-300">
      {/* <Header /> */}

      <AuthProvider>
        <Header />
      </AuthProvider>
      <div className="container mx-auto py-10 px-4">
        {/* Balances Overview */}
        <div className="mb-10 text-center">
          <h2 className="text-4xl font-bold bg-gradient-to-r from-purple-400 via-blue-500 to-blue-600 text-transparent bg-clip-text mb-8">
            Portfolio Overview
          </h2>

          <div className="grid grid-cols-3 gap-6">
            <div className="p-6 bg-gray-800 rounded-lg shadow-lg">
              <h3 className="text-lg font-semibold text-purple-400 mb-2">
                Investable Balance
              </h3>
              <p className="text-2xl font-bold">{investableBalance}</p>
            </div>

            <div className="p-6 bg-gray-800 rounded-lg shadow-lg">
              <h3 className="text-lg font-semibold text-blue-400 mb-2">
                Invested Balance
              </h3>
              <p className="text-2xl font-bold">{investedBalance}</p>
            </div>

            <div className="p-6 bg-gray-800 rounded-lg shadow-lg">
              <h3 className="text-lg font-semibold text-green-400 mb-2">
                Total Balance
              </h3>
              <p className="text-2xl font-bold">{totalBalance}</p>
            </div>
          </div>
        </div>

        {/* Investable Holdings Section */}
        <div className="mb-10">
          <h3 className="text-2xl font-semibold text-purple-400 mb-4">
            Investable Coins
          </h3>
          <table className="min-w-full bg-gray-800 rounded-lg overflow-hidden">
            <thead>
              <tr className="bg-gray-700">
                <th className="px-6 py-3 text-left">Coin Name</th>
                <th className="px-6 py-3 text-left">Price</th>
              </tr>
            </thead>
            <tbody>
              {investableHoldings.map((coin, index) => (
                <tr key={index} className="border-b border-gray-700">
                  <td className="px-6 py-4">{coin.coinName}</td>
                  <td className="px-6 py-4">{coin.price}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Current Holdings Section */}
        <div>
          <h3 className="text-2xl font-semibold text-blue-400 mb-4">
            Current Holdings
          </h3>
          <table className="min-w-full bg-gray-800 rounded-lg overflow-hidden">
            <thead>
              <tr className="bg-gray-700">
                <th className="px-6 py-3 text-left">Coin Name</th>
                <th className="px-6 py-3 text-left">Quantity</th>
                <th className="px-6 py-3 text-left">Current Price</th>
              </tr>
            </thead>
            <tbody>
              {currentHoldings.map((coin, index) => (
                <tr key={index} className="border-b border-gray-700">
                  <td className="px-6 py-4">{coin.coinName}</td>
                  <td className="px-6 py-4">{coin.quantity}</td>
                  <td className="px-6 py-4">{coin.currPrice}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Portfolio;
