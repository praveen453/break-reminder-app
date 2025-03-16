import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Container, TextField, Button, Card, CardContent, Typography, Alert } from "@mui/material";
import { motion } from "framer-motion";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    try {
      const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/auth/register`, {
        name,
        email,
        password,
      });

      console.log("Registration successful", response.data);
      navigate("/"); 
    } catch (err) {
      setError("Registration failed. Please try again.");
    }
  };

  return (
    <Container maxWidth="sm">
      <motion.div 
        initial={{ opacity: 0, y: -50 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 0.5 }}
      >
        <Card sx={{ marginTop: 5, padding: 3, boxShadow: 5, borderRadius: 3 }}>
          <CardContent>
            <Typography variant="h4" align="center" gutterBottom color="primary" sx={{ fontWeight: "bold" }}>
              Register
            </Typography>

            {error && <Alert severity="error" sx={{ marginBottom: 2 }}>{error}</Alert>}

            <form onSubmit={handleRegister}>
              <TextField
                label="Full Name"
                variant="outlined"
                fullWidth
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                sx={{ marginBottom: 2 }}
              />
              <TextField
                label="Email"
                type="email"
                variant="outlined"
                fullWidth
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                sx={{ marginBottom: 2 }}
              />
              <TextField
                label="Password"
                type="password"
                variant="outlined"
                fullWidth
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                sx={{ marginBottom: 2 }}
              />
              <TextField
                label="Confirm Password"
                type="password"
                variant="outlined"
                fullWidth
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                sx={{ marginBottom: 2 }}
              />
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button type="submit" variant="contained" color="primary" fullWidth sx={{ marginBottom: 2, py: 1.5, fontWeight: "bold" }}>
                  Register
                </Button>
              </motion.div>
            </form>

            <Typography variant="body2" align="center">
              Already have an account?{" "}
              <Button onClick={() => navigate("/")} variant="text" color="primary">
                Login
              </Button>
            </Typography>
          </CardContent>
        </Card>
      </motion.div>
    </Container>
  );
}

export default Register;
