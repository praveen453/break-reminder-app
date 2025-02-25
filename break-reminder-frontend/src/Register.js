import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Container, TextField, Button, Card, CardContent, Typography, Alert } from "@mui/material";

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
      const response = await axios.post("http://localhost:5050/api/auth/register", {
        name,
        email,
        password,
      });

      console.log("Registration successful", response.data);
      navigate("/"); // ✅ Redirect to Login after registration
    } catch (err) {
      setError("Registration failed. Please try again.");
    }
  };

  return (
    <Container maxWidth="sm">
      <Card sx={{ marginTop: 5, padding: 3, boxShadow: 3 }}>
        <CardContent>
          <Typography variant="h4" align="center" gutterBottom>
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
            <Button type="submit" variant="contained" color="primary" fullWidth sx={{ marginBottom: 2 }}>
              Register
            </Button>
          </form>

          <Typography variant="body2" align="center">
            Already have an account?{" "}
            <Button onClick={() => navigate("/")} variant="text" color="primary">
              Login
            </Button>
          </Typography>
        </CardContent>
      </Card>
    </Container>
  );
}

export default Register;
