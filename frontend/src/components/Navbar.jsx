import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    console.log('User logged out');
    navigate('/');
  };

  return (
    <motion.nav
      style={styles.navbar}
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: 'spring', stiffness: 60, damping: 15 }}
    >
      {/* Left Side - Brand */}
      <motion.div
        style={styles.brand}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => navigate('/home')}
      >
        ByteBite
      </motion.div>

      {/* Right Side - Profile and Logout */}
      <div style={styles.actions}>
        <motion.button
          style={styles.button}
          whileHover={{
            scale: 1.1,
            backgroundColor: '#60a5fa', // Lighter blue on hover
            transition: { duration: 0.2 },
          }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate('/profile')}
        >
          Profile
        </motion.button>
        <motion.button
          style={styles.button}
          whileHover={{
            scale: 1.1,
            backgroundColor: '#f87171', // Red color on hover
            transition: { duration: 0.2 },
          }}
          whileTap={{ scale: 0.95 }}
          onClick={handleLogout}
        >
          Logout
        </motion.button>
      </div>
    </motion.nav>
  );
}

const styles = {
  navbar: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '12px 24px',
    backgroundColor: '#4f46e5',
    color: '#fff',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
    position: 'sticky',
    top: 0,
    zIndex: 1000,
  },
  brand: {
    fontSize: '1.5rem',
    fontWeight: 'bold',
    cursor: 'pointer',
    transition: 'color 0.3s ease',
  },
  actions: {
    display: 'flex',
    gap: '15px',
  },
  button: {
    padding: '8px 16px',
    fontSize: '1rem',
    fontWeight: '500',
    color: '#fff',
    backgroundColor: '#3b82f6',
    border: 'none',
    borderRadius: '20px',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
    outline: 'none',
  },
};
