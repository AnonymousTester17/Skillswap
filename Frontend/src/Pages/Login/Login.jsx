import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import { FaGoogle } from "react-icons/fa";
import { GrSecure } from "react-icons/gr";

const Login = () => {
  const [isHovered, setIsHovered] = useState(false); // State for hover effect

  const handleGoogleLogin = () => {
    window.location.href = "http://localhost:8000/auth/google";
  };

  const containerStyle = {
    // height: "90.4vh",
    minHeight: "90.4vh",
    // height: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "var(--primary-bg)",
  };

  const loginBoxStyle = {
    height: "200px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    gap: "20px",
    padding: "20px",
    border: "1px solid var(--main)", // Border color
    borderRadius: "20px",
    boxShadow: "10px 10px 10px var(--secondary-bg)",
    zIndex: "999",
  };

  const titleStyle = {
    fontSize: "2rem",
    fontFamily: "Roboto, sans-serif", // Font family
    color: "var(--main)", // Text color
    textAlign: "center",
  };

  const buttonContainerStyle = {
    display: "flex",
    justifyContent: "center",
  };

  const buttonStyle = {
    backgroundColor: "var(--main)", // Button background color
    color: "var(--primary-bg)", // Button text color
    fontFamily: "Montserrat",
    border: "none",
    padding: "10px 20px",
    borderRadius: "5px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "8px",
    cursor: "pointer",
  };

  const hoverButtonStyle = {
    backgroundColor: "var(--hover-btn)", // Button background color on hover
    color: "var(--primary-bg)", // Button text color
    fontFamily: "Montserrat",
    border: "none",
    padding: "10px 20px",
    borderRadius: "5px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "8px",
    cursor: "pointer",
    transition: "background-color 0.3s ease-in-out", // Transition effect
  };

  return (
    <div style={containerStyle}>
      <div style={loginBoxStyle}>
        <h1 style={titleStyle}>LOGIN</h1>
        <GrSecure size={50} style={{ color: "var(--dark-bg)"}}/>
        <div style={buttonContainerStyle}>
          <Button
            style={isHovered ? hoverButtonStyle : buttonStyle} // Apply style based on hover state
            onMouseEnter={() => setIsHovered(true)} // Set hover state to true on mouse enter
            onMouseLeave={() => setIsHovered(false)} // Set hover state to false on mouse leave
            onClick={handleGoogleLogin}
          >
            <FaGoogle /> Login with Google
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Login;
