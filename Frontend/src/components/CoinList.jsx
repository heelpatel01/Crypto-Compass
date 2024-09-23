import React from "react";

function CoinList({ coins, onTradeClick }) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full text-left text-sm">
        <thead className="bg-gray-800 text-gray-300">
          <tr>
            <th className="px-4 py-2">Coin</th>
            <th className="px-4 py-2">Symbol</th>
            <th className="px-4 py-2">Price (INR)</th>
            <th className="px-4 py-2">Market Cap Rank</th>
            <th className="px-4 py-2">Trade</th>
          </tr>
        </thead>
        <tbody className="bg-gray-900 bg-opacity-30 text-gray-400">
          {coins.map((coin) => (
            <tr key={coin.id} className="border-b border-gray-700 hover:bg-gray-800 transition-all">
              <td className="px-4 py-2 flex items-center">
                <img
                  src={coin.image}
                  alt={coin.name}
                  className="w-6 h-6 mr-2"
                />
                {coin.name}
              </td>
              <td className="px-4 py-2">{coin.symbol.toUpperCase()}</td>
              <td className="px-4 py-2">₹ {coin.current_price.toLocaleString()}</td>
              <td className="px-4 py-2">{coin.market_cap_rank}</td>
              <td className="px-4 py-2">
                <button
                  onClick={() => onTradeClick(coin)}
                  className="bg-gradient-to-br from-purple-400 via-blue-500 to-blue-600 hover:from-blue-400 hover:to-purple-600 text-white font-bold py-2 px-4 rounded transition-all"
                >
                  Trade
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default CoinList;
