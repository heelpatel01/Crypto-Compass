import React from "react";
import { Link } from "react-router-dom";

function Blogs() {
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
    icon: {
      fontSize: "60px",
      color: "#ffcc00",
      marginBottom: "16px",
      animation: "spin 2s linear infinite",
    },
    heading: {
      marginBottom: "16px",
      fontSize: "2rem",
    },
    body: {
      marginBottom: "32px",
      fontSize: "1rem",
    },
    button: {
      backgroundColor: "#ffcc00",
      color: "#1a1d21",
      padding: "10px 20px",
      border: "none",
      borderRadius: "4px",
      cursor: "pointer",
      textDecoration: "none",
    },
    buttonHover: {
      backgroundColor: "#e6b800",
    },
  };

  return (
    <div style={styles.container}>
      <div>
        <div style={styles.icon}>&#8987;</div>
        <h1 style={styles.heading}>Coming Soon!</h1>
        <p style={styles.body}>
          Were working hard to bring you exciting content. Stay tuned!
        </p>
        <Link to="/" style={{ textDecoration: "none" }}>
          <button
            style={styles.button}
            onMouseOver={(e) => (e.target.style.backgroundColor = styles.buttonHover.backgroundColor)}
            onMouseOut={(e) => (e.target.style.backgroundColor = styles.button.backgroundColor)}
          >
            Go Back Home
          </button>
        </Link>
      </div>
    </div>
  );
}

export default Blogs;
