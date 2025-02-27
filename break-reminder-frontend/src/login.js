import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Container, TextField, Button, Card, CardContent, Typography, Alert } from "@mui/material";
import { motion } from "framer-motion";

export let token;

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await axios.post("http://break-reminder-app-production.up.railway.app/api/auth/login", {
        email,
        password,
      });

      // ✅ Save token in localStorage securely
      localStorage.setItem("token", response.data.token);

      // ✅ Redirect to Dashboard
      navigate("/dashboard");
    } catch (err) {
      setError("Login failed. Please check your credentials.");
    }
  };

  return (
    <Container maxWidth="sm">
      <motion.div 
        initial={{ opacity: 0, y: -50 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 0.5 }}
      >
        <Card sx={{ mt: 5, p: 3, boxShadow: 5, borderRadius: 3 }}>
          <CardContent>
            <Typography variant="h5" gutterBottom align="center" color="primary" sx={{ fontWeight: "bold" }}>
              Login to Break Reminder
            </Typography>

            {error && <Alert severity="error">{error}</Alert>}

            <form onSubmit={handleSubmit}>
              <TextField
                fullWidth
                margin="normal"
                label="Email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <TextField
                fullWidth
                margin="normal"
                label="Password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />

              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button type="submit" variant="contained" sx={{ mt: 2, py: 1.5, fontWeight: "bold" }} fullWidth>
                  Login
                </Button>
              </motion.div>
            </form>

            <Typography variant="body2" align="center" sx={{ mt: 2 }}>
              Don't have an account? {" "}
              <Button onClick={() => navigate("/register")} color="primary">
                Register
              </Button>
            </Typography>
          </CardContent>
        </Card>
      </motion.div>
    </Container>
  );
}

export default Login;
