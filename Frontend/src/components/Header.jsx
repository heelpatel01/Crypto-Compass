import React, { useContext, useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import axiosInstance from "../Utils/AxiosInstance";
import { AuthContext } from "../contexts/AuthProvider";
import logo from "../assets/cryptocompasslogo.jpg"; // The imported logo
import "./Header.css"

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const authState = useContext(AuthContext);
  const [login, setLogin] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const response = await axiosInstance.get("/user/isloggedin");
        if (response.data && response.data.success) {
          setLogin(true);
        } else {
          setLogin(false);
        }
      } catch (error) {
        console.error("Error checking login status:", error);
        setLogin(false); // Assume user is not logged in on error
      }
    };

    checkLoginStatus();
  }, [
    authState.universalLoggedin,
    authState.setUniversalLoggedin,
    login,
    setLogin,
  ]);

  const handleLogout = async () => {
    try {
      const response = await axiosInstance.get("/user/logout");

      if (response.data && response.data.success) {
        authState.setUniversalLoggedin(false);
        setLogin(false);
        window.location.reload();
        navigate("/");

        return;
      }
    } catch (error) {
      console.error("Logout failed: ", error);
    }
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const linkClasses = "hover:text-white transition-colors";

  return (
    <header className="bg-gray-900 text-gray-300 shadow-lg">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        {/* Logo Section */}
        <div className="flex items-center">
          <Link to="/" className="hover:text-white transition-colors">
           <div className="font-semibold">CRYPTO COMPASS</div>
          </Link>
        </div>

        {/* Navigation Links for Desktop */}
        <nav className="hidden md:flex space-x-8">
          <NavLink
            to="/"
            exact
            className={linkClasses}
            activeClassName="text-purple-500"
          >
            Home
          </NavLink>
          <NavLink
            to="/exchange"
            className={linkClasses}
            activeClassName="text-purple-500"
          >
            Exchange
          </NavLink>
          <NavLink
            to="/portfolio"
            className={linkClasses}
            activeClassName="text-purple-500"
          >
            Portfolio
          </NavLink>
          <NavLink
            to="/blogs"
            className={linkClasses}
            activeClassName="text-purple-500"
          >
            Blogs
          </NavLink>
        </nav>

        {/* Call to Action or Logout Button for Desktop */}
        {!login ? (
          <div className="hidden md:block">
            <button
              onClick={handleLogout}
              className="bg-red-600 text-white px-4 py-2 rounded-full font-semibold hover:bg-red-700 transition-colors"
            >
              Logout
            </button>
          </div>
        ) : (
          <div className="hidden md:block">
            <Link
              to="/signup"
              className="bg-purple-600 text-white px-6 py-2 rounded-full font-semibold hover:bg-purple-700 transition-colors"
            >
              Get Started
            </Link>
          </div>
        )}

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button
            onClick={toggleMenu}
            className="text-purple-500 focus:outline-none"
            aria-label="Open Menu"
          >
            <svg
              className="w-8 h-8"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16m-7 6h7"
              ></path>
            </svg>
          </button>
        </div>
      </div>

      {/* Dropdown Menu for Mobile */}
      {menuOpen && (
        <div className="md:hidden bg-gray-800 text-gray-300 shadow-lg mt-4 px-4 py-2">
          <nav className="flex flex-col space-y-4">
            <NavLink
              to="/"
              exact
              className={linkClasses}
              activeClassName="text-purple-500"
              onClick={() => setMenuOpen(false)}
            >
              Home
            </NavLink>
            <NavLink
              to="/exchange"
              className={linkClasses}
              activeClassName="text-purple-500"
              onClick={() => setMenuOpen(false)}
            >
              Exchange
            </NavLink>
            <NavLink
              to="/portfolio"
              className={linkClasses}
              activeClassName="text-purple-500"
              onClick={() => setMenuOpen(false)}
            >
              Portfolio
            </NavLink>
            <NavLink
              to="/blogs"
              className={linkClasses}
              activeClassName="text-purple-500"
              onClick={() => setMenuOpen(false)}
            >
              Blogs
            </NavLink>
          </nav>
        </div>
      )}
    </header>
  );
}

export default Header;
