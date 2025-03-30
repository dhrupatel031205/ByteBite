import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

export default function SplashPage() {
  const navigate = useNavigate()

  return (
    <div style={styles.container}>
      {/* Welcome Message */}
      <motion.h1
        style={styles.welcomeMessage}
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        Welcome to ByteBite!
      </motion.h1>

      {/* Button Container */}
      <div style={styles.buttonContainer}>
        {/* Login Button */}
        <motion.button
          style={styles.loginButton}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => navigate("/login")}
        >
          Login
        </motion.button>

        {/* Sign-Up Button */}
        <motion.button
          style={styles.signupButton}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => navigate("/signup")}
        >
          Sign Up
        </motion.button>
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "100vh",
    background: "linear-gradient(135deg, #4f46e5, #ec4899)",
    color: "white",
  },
  welcomeMessage: {
    fontSize: "3rem",
    fontWeight: "bold",
    marginBottom: "20px",
  },
  buttonContainer: {
    display: "flex",
    gap: "20px",
  },
  loginButton: {
    padding: "12px 32px",
    fontSize: "1rem",
    fontWeight: "600",
    color: "white",
    backgroundColor: "#3b82f6",
    border: "none",
    borderRadius: "30px",
    cursor: "pointer",
    transition: "background-color 0.3s ease",
  },
  signupButton: {
    padding: "12px 32px",
    fontSize: "1rem",
    fontWeight: "600",
    color: "white",
    backgroundColor: "#ec4899",
    border: "none",
    borderRadius: "30px",
    cursor: "pointer",
    transition: "background-color 0.3s ease",
  },
};

styles.loginButton[":hover"] = {
  backgroundColor: "#2563eb",
};
styles.signupButton[":hover"] = {
  backgroundColor: "#db2777",
};
