import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

export default function SignUp() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
  });

  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const res = await fetch('http://localhost:5001/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
  
      const data = await res.json();
      if (!res.ok) throw new Error(data.msg);
  
      localStorage.setItem('token', data.token);
      navigate('/dashboard');
    } catch (err) {
      setError(err.message);
    }
  };
  

  return (
    <div style={styles.container}>
      <motion.h1
        style={styles.heading}
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Sign Up
      </motion.h1>

      <form onSubmit={handleSubmit} style={styles.form}>
        {/* Name Field */}
        <motion.input
          type="text"
          name="fullName"
          placeholder="Name"
          value={formData.fullName}
          onChange={handleChange}
          style={styles.input}
          whileFocus={{ scale: 1.05 }}
        />

        {/* Email Field */}
        <motion.input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          style={styles.input}
          whileFocus={{ scale: 1.05 }}
        />

        {/* Password Field */}
        <motion.input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          style={styles.input}
          whileFocus={{ scale: 1.05 }}
        />

        {/* Error Message */}
        {error && <p style={styles.error}>{error}</p>}

        {/* Login Link */}
        <p style={styles.loginText}>
          Already have an account?{' '}
          <span onClick={() => navigate('/login')} style={styles.loginLink}>
            Log in
          </span>
        </p>

        {/* Submit Button */}
        <motion.button
          type="submit"
          style={styles.button}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Sign Up
        </motion.button>
      </form>
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    background: 'linear-gradient(135deg, #4f46e5, #ec4899)',
    color: 'white',
  },
  heading: {
    fontSize: '2.5rem',
    fontWeight: 'bold',
    marginBottom: '20px',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '15px',
    width: '100%',
    maxWidth: '400px',
  },
  input: {
    padding: '12px 20px',
    fontSize: '1rem',
    borderRadius: '30px',
    border: 'none',
    outline: 'none',
    backgroundColor: '#f1f1f1',
    color: '#333',
    transition: 'background-color 0.3s ease',
  },
  button: {
    padding: '12px 20px',
    fontSize: '1rem',
    fontWeight: '600',
    color: 'white',
    backgroundColor: '#3b82f6',
    border: 'none',
    borderRadius: '30px',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
  },
  error: {
    color: '#ff4d4d',
    fontSize: '0.9rem',
    marginTop: '-10px',
  },
  loginText: {
    fontSize: '0.9rem',
    color: '#f1f1f1',
    textAlign: 'center',
  },
  loginLink: {
    color: '#93c5fd',
    fontWeight: '600',
    cursor: 'pointer',
    textDecoration: 'underline',
  },
};
