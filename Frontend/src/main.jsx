/* eslint no-unused-vars : "off" */
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx"; // Not used, but kept for reference
import Home from "./pages/Home.jsx";
import Portfolio from "./pages/Portfolio.jsx";
import Signup from "./pages/Signup.jsx";
import Login from "./pages/Login.jsx";
import "./index.css";
import { AuthProvider } from "./contexts/AuthProvider.jsx";
import Exchange from "./pages/Exchange.jsx";
import Blogs  from "./pages/Blogs.jsx";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Header from "./components/Header.jsx";
import ErrorPage from "./pages/ErrorPage.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <>
        <Home />
      </>
    ),
  },
  {
    path: "/portfolio",
    element: (
      <>
        <Portfolio />
      </>
    ),
  },
  {
    path: "/signup",
    element: (
      <>
        <Signup />
      </>
    ),
  },
  {
    path: "/login",
    element: (
      <>
        <Login />
      </>
    ),
  },
  {
    path: "/exchange",
    element: (
      <>
        <Exchange />
      </>
    ),
  },
  {
    path: "/blogs",
    element: (
      <>
        <Blogs />
      </>
    ),
  },
  {
    path:"*",
    element:(
      <>
      <ErrorPage/>
        </>
    )
  }
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>
);
