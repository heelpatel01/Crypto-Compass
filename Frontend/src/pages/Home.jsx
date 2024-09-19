/* eslint no-unused-vars : "off" */
import React from "react";
import Header from "../components/Header";
import { AuthProvider } from "../contexts/AuthProvider";

function Home() {
  return (
    <div className="min-h-screen bg-gray-900 text-gray-300">
      {/* <Header /> */}

      <AuthProvider>
        <Header />
      </AuthProvider>

      {/* Introduction Section */}
      <div className="container mx-auto py-12 px-4">
        <h1 className="text-5xl font-bold text-center bg-gradient-to-r from-purple-400 via-blue-500 to-blue-600 text-transparent bg-clip-text mb-12">
          Welcome to Crypto Compass
        </h1>
        <p className="text-center text-lg text-gray-400 mb-12">
          Crypto Compass is your beginner-friendly platform for exploring,
          investing, and mastering cryptocurrency trading. With live charts,
          virtual money, and insightful articles, you can become a confident
          trader without the risks.
        </p>

        {/* Tiles Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Tile 1 */}
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
            <img
              src="https://via.placeholder.com/150"
              alt="Features"
              className="w-full h-32 object-cover rounded-t-lg mb-4"
            />
            <h3 className="text-2xl font-semibold text-blue-400 mb-2">
              Trade with Virtual Money
            </h3>
            <p className="text-gray-400">
              Practice and perfect your trading skills without any financial
              risk. Use virtual money to buy and sell cryptocurrencies.
            </p>
          </div>

          {/* Tile 2 */}
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
            <img
              src="https://via.placeholder.com/150"
              alt="Live Charts"
              className="w-full h-32 object-cover rounded-t-lg mb-4"
            />
            <h3 className="text-2xl font-semibold text-purple-400 mb-2">
              Live Cryptocurrency Charts
            </h3>
            <p className="text-gray-400">
              Stay updated with live price movements of your favorite
              cryptocurrencies and make informed decisions based on real-time
              data.
            </p>
          </div>

          {/* Tile 3 */}
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
            <img
              src="https://via.placeholder.com/150"
              alt="Portfolio"
              className="w-full h-32 object-cover rounded-t-lg mb-4"
            />
            <h3 className="text-2xl font-semibold text-green-400 mb-2">
              Build Your Portfolio
            </h3>
            <p className="text-gray-400">
              Track and manage your virtual portfolio. Experiment with different
              strategies and see how your investments grow.
            </p>
          </div>

          {/* Tile 4 */}
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
            <img
              src="https://via.placeholder.com/150"
              alt="Articles"
              className="w-full h-32 object-cover rounded-t-lg mb-4"
            />
            <h3 className="text-2xl font-semibold text-pink-400 mb-2">
              Learn with Articles
            </h3>
            <p className="text-gray-400">
              Explore curated content and educational articles that help you
              understand the basics and complexities of cryptocurrency trading.
            </p>
          </div>

          {/* Tile 5 */}
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
            <img
              src="https://via.placeholder.com/150"
              alt="Secure"
              className="w-full h-32 object-cover rounded-t-lg mb-4"
            />
            <h3 className="text-2xl font-semibold text-red-400 mb-2">
              Safe and Secure
            </h3>
            <p className="text-gray-400">
              We prioritize your security. Our platform is designed with safety
              protocols to protect your personal information and assets.
            </p>
          </div>

          {/* Tile 6 */}
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
            <img
              src="https://via.placeholder.com/150"
              alt="Community"
              className="w-full h-32 object-cover rounded-t-lg mb-4"
            />
            <h3 className="text-2xl font-semibold text-yellow-400 mb-2">
              Join a Growing Community
            </h3>
            <p className="text-gray-400">
              Become part of a supportive community where you can share
              insights, ask questions, and grow as a trader.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
