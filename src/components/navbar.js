import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => (
  <nav
    style={{
      height:"70px",
      padding: "10px 40px",
      backgroundColor: "#1a202c",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      color: "#fff",
      boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
    }}
  >
    
    <div style={{ fontSize: "20px", fontWeight: "bold" }}>Student Portal</div>
    <div>
      <Link
        to="/"
        style={{
          marginRight: "20px",
          textDecoration: "none",
          color: "#fff",
          fontWeight: "500",
        }}
        onMouseEnter={(e) => (e.target.style.borderBottom = "2px solid white")}
        onMouseLeave={(e) => (e.target.style.borderBottom = "2px solid transparent")}
      >
        All Students
      </Link>
      <Link
        to="/profile"
        style={{
          textDecoration: "none",
          color: "#fff",
          fontWeight: "500",
        }}
        onMouseEnter={(e) => (e.target.style.borderBottom = "2px solid white")}
        onMouseLeave={(e) => (e.target.style.borderBottom = "2px solid transparent")}
      >
        Profile
      </Link>
    </div>
  </nav>
);

export default Navbar;
