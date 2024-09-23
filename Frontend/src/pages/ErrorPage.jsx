// ErrorPage.js
import React from "react";
import { Link } from "react-router-dom";

function ErrorPage() {
  return (
    <div style={styles.container}>
      <div style={styles.content}>
        <div style={styles.icon}>⚠️</div>
        <h1 style={styles.heading}>404 - Page Not Found</h1>
        <p style={styles.paragraph}>Oops! The page youre looking for doesnt exist.</p>
        <Link to="/" style={styles.link}>
          <button style={styles.button}>Go Back Home</button>
        </Link>
      </div>
    </div>
  );
}

const styles = {
  container: {
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    background: "linear-gradient(135deg, #1a1d21 0%, #3a3d41 100%)",
    color: "white",
  },
  content: {
    textAlign: "center",
  },
  icon: {
    fontSize: "60px",
    color: "#ff3b30",
    marginBottom: "16px",
  },
  heading: {
    fontSize: "2.5rem",
    marginBottom: "16px",
  },
  paragraph: {
    fontSize: "1rem",
    marginBottom: "32px",
  },
  link: {
    textDecoration: "none",
  },
  button: {
    backgroundColor: "#ffcc00",
    color: "#1a1d21",
    padding: "10px 20px",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    fontSize: "1rem",
  },
};

export default ErrorPage;
