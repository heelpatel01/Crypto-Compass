import React, { useState, useEffect } from "react";
import { AuthProvider } from "../contexts/AuthProvider";
import Header from "../components/Header";
import CoinList from "../components/CoinList";
import TradeModal from "../components/TradeModal";

function Exchange() {
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCoin, setSelectedCoin] = useState(null);

  // Fetch the coins data from CoinGecko API
  useEffect(() => {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        "x-cg-demo-api-key": "CG-uBePUKnoBs5CB6vTYjBpaj2C",
      },
    };

    fetch(
      "https://api.coingecko.com/api/v3/coins/markets?vs_currency=inr&category=layer-1",
      options
    )
      .then((response) => response.json())
      .then((data) => {
        setCoins(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  const handleTradeClick = (coin) => {
    setSelectedCoin(coin);
  };

  const closeModal = () => {
    setSelectedCoin(null);
  };

  return (
    <>
      <AuthProvider>
        <Header />
        <div className="mx-auto px-4 py-6 bg-gray-900 text-gray-300">
          <h1 className=" py-2 text-3xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-blue-500 to-blue-600">
            Exchange
          </h1>
          {loading ? (
            <p className="text-purple-400">Loading...</p>
          ) : (
            <CoinList coins={coins} onTradeClick={handleTradeClick} />
          )}
        </div>
      </AuthProvider>

      {selectedCoin && <TradeModal coin={selectedCoin} onClose={closeModal} />}
    </>
  );
}

export default Exchange;
